package kr.or.kosa.ubun2_be.domain.alarm.service;

import com.google.firebase.messaging.*;
import kr.or.kosa.ubun2_be.domain.alarm.dto.GroupAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.dto.PersonalAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.entity.Alarm;
import kr.or.kosa.ubun2_be.domain.alarm.repository.CustomerAlarmRedisRepository;
import kr.or.kosa.ubun2_be.domain.alarm.repository.MemberAlarmRedisRepository;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerExceptionType;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberCustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderRequest;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductException;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductExceptionType;
import kr.or.kosa.ubun2_be.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Component
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService{

    private final MemberRepository memberRepository;
    private final FirebaseMessaging firebaseMessaging;
    private final MemberAlarmRedisRepository memberAlarmRedisRepository;
    private final CustomerAlarmRedisRepository customerAlarmRedisRepository;
    private final MemberCustomerRepository memberCustomerRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    @Override
    public String sendMessageToPersonal(PersonalAlarmSendRequest request) {
        Member member = memberRepository.findById(request.getTargetMemberId())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));

        Message message = makePersonalMessage(request, member.getFcmToken());
        String messageId = sendMessage(message);

        Alarm alarm = Alarm.createAlarm(request.getTitle(), request.getContent(), request.getLink());
        memberAlarmRedisRepository.saveAlarm(String.valueOf(member.getMemberId()), alarm);
        return messageId;
    }

    @Override
    public void subscribeCustomer(String FcmToken, Long customerId) {
        try {
            firebaseMessaging.subscribeToTopic(List.of(FcmToken), String.valueOf(customerId));
        } catch (FirebaseMessagingException e) {
            log.error("Failed to subscribe customer", e);
            throw new RuntimeException("구독 실패: " + e.getMessagingErrorCode() + " - " + e.getMessage());
        }
    }

    @Override
    public void unsubscribeCustomer(String FcmToken, Long customerId) {
        try {
            firebaseMessaging.unsubscribeFromTopic(List.of(FcmToken), String.valueOf(customerId));
        } catch (FirebaseMessagingException e) {
            log.error("Failed to unsubscribe customer", e);
            throw new RuntimeException("구독 취소 실패: " + e.getMessagingErrorCode() + " - " + e.getMessage());
        }

    }

    @Override
    public void sendMessageToGroup(GroupAlarmSendRequest request) {
        String topic = String.valueOf(request.getCustomerId());
        Message message = makeGroupMessage(request, topic);
        sendMessage(message);

        // TODO: 실제 링크로 변경
        Alarm alarm = Alarm.createAlarm(request.getTitle(), request.getContent(),"");
        List<Member> members = memberCustomerRepository.findMembersByCustomerId(request.getCustomerId());

        for (Member member : members) {
            memberAlarmRedisRepository.saveAlarm(String.valueOf(member.getMemberId()), alarm);
        }
    }

    @Override
    public List<Alarm> getMemberPushMessages(Long memberId) {
        List<Object> objects = memberAlarmRedisRepository.findAlarmsByMemberId(String.valueOf(memberId));
        return objects.stream()
                .filter(obj -> obj instanceof Alarm)
                .map(obj -> (Alarm) obj)
                .collect(Collectors.toList());
    }

    @Override
    public void markAsRead(Long memberId, String alarmId) {
        memberAlarmRedisRepository.removeAlarmById(String.valueOf(memberId), alarmId);
    }

    @Override
    public void sendMessageToCustomer(SubscriptionOrderRequest request) {
        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new CustomerException(CustomerExceptionType.NOT_EXIST_CUSTOMER));

        Product firstProduct = getFirstProduct(request, customer);
        String firstProductName = firstProduct.getProductName();
        int productListSize = request.getSubscriptionOrderProducts().size();

        String title = getOrderTitle(request.getIntervalDays());
        String content = getOrderContent(firstProductName, productListSize);
        String link = "http://localhost:5173/customer/app/pendingorder";

        Message message = makeOrderMessage(title, content, customer.getFcmToken(), link);
        String messageId = sendMessage(message);

        // TODO: 실제 링크로 변경
        Alarm alarm = Alarm.createAlarm(title, content, link);
        customerAlarmRedisRepository.saveAlarm(String.valueOf(customer.getCustomerId()), alarm);
    }

    @Override
    public List<Alarm> getCustomerPushMessages(Long customerId) {
        List<Object> objects = customerAlarmRedisRepository.findAlarmsByCustomerId(String.valueOf(customerId));
        return objects.stream()
                .filter(obj -> obj instanceof Alarm)
                .map(obj -> (Alarm) obj)
                .collect(Collectors.toList());
    }

    @Override
    public void markCustomerAlarmAsRead(Long customerId, String alarmId) {
        customerAlarmRedisRepository.removeAlarmById(String.valueOf(customerId),alarmId);
    }

    @Override
    public void sendSubCycleMessage(SubscriptionOrder subscriptionOrder,String delayReason) {
        String businessName = subscriptionOrder.getSubscriptionOrderProducts().get(0).getProduct().getCustomer().getBusinessName();
        Long orderId = subscriptionOrder.getSubscriptionOrderId();
        int currentCycle = subscriptionOrder.getMaxCycleNumber();
        String fcmToken = subscriptionOrder.getMember().getFcmToken();

        String content = delayReason == null ?
                         currentCycle + "회차 정기주문 완료 - 주문번호 : " + orderId :
                         currentCycle + "회차 정기주문 연기 - 연기사유 : " + delayReason;

        Message message = makeSubCycleMessage(businessName, content, fcmToken, subscriptionOrder.getSubscriptionOrderId());
        sendMessage(message);
        // TODO: 실제 링크로 변경
        Alarm alarm = Alarm.createAlarm(businessName, content,"");
        memberAlarmRedisRepository.saveAlarm(String.valueOf(subscriptionOrder.getMember().getMemberId()),alarm);
    }

    @Override
    public void sendNoStock(SubscriptionOrderProduct subscriptionOrderProduct, Long orderId) {
        String fcmToken = subscriptionOrderProduct.getProduct().getCustomer().getFcmToken();
        String title = "재고부족";
        String content = subscriptionOrderProduct.getProduct().getProductName() + " - 상품 재고가 부족합니다.";
        String link = "http://localhost:5173/customer/app/product";

        sendMessage(makeOrderMessage(title,content,fcmToken,link));
        // TODO: 실제 링크로 변경
        Alarm alarm = Alarm.createAlarm(title, content,link);
        customerAlarmRedisRepository.saveAlarm(String.valueOf(subscriptionOrderProduct.getProduct().getCustomer().getCustomerId()),alarm);
    }

    // 단건,정기주문 들어왔을때, 재고 부족할때 - 고객에게 날아가는 push
    private Message makeOrderMessage(String title, String content, String token, String link) {
        return Message.builder()
                .setWebpushConfig(WebpushConfig.builder()
                        .setFcmOptions(WebpushFcmOptions.builder()
                                .setLink(link)
                                .build())
                        .build())
                .putData("title", title)
                .putData("content", content)
                .putData("link",link)
                .putData("receiver","CUSTOMER")
                .setToken(token)
                .build();
    }

    private Message makePersonalMessage(PersonalAlarmSendRequest request, String token) {
        return Message.builder()
                .setWebpushConfig(WebpushConfig.builder()
                        .setFcmOptions(WebpushFcmOptions.builder()
                                .setLink(request.getLink())
                                .build())
                        .build())
                .putData("title", request.getTitle())
                .putData("content", request.getContent())
                .putData("link",request.getLink())
                .putData("receiver","MEMBER")
                .setToken(token)
                .build();
    }

    private Message makeGroupMessage(GroupAlarmSendRequest request, String topic) {
        return Message.builder()
                .setWebpushConfig(WebpushConfig.builder()
                        .setFcmOptions(WebpushFcmOptions.builder()
                                .setLink(request.getLink())
                                .build())
                        .build())
                .putData("title", request.getTitle())
                .putData("content", request.getContent())
                .putData("link",request.getLink())
                .putData("receiver","MEMBER")
                .setTopic(topic)
                .build();
    }

    private Message makeSubCycleMessage(String title, String content, String token, Long orderId) {
        return Message.builder()
                .putData("title", title)
                .putData("content", content)
                .putData("orderId",String.valueOf(orderId))
                .putData("receiver","MEMBER")
                .setToken(token)
                .build();
    }


    private String sendMessage(Message message) {
        try {
            String response = firebaseMessaging.send(message);
            return response;
        } catch (FirebaseMessagingException e) {
            log.error("Failed to send message", e);
            throw new RuntimeException("알림 전송 실패: " + e.getMessagingErrorCode() + " - " + e.getMessage());

        }
    }


    private Product getFirstProduct(SubscriptionOrderRequest request, Customer customer) {
        Long firstProductId = request.getSubscriptionOrderProducts().get(0).getProductId();
        return productRepository.findByCustomerCustomerIdAndProductId(customer.getCustomerId(), firstProductId)
                .orElseThrow(() -> new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));
    }

    private String getOrderTitle(int intervalDays) {
        return intervalDays == 0 ? "단건주문" : "정기주문";
    }

    private String getOrderContent(String firstProductName, int productListSize) {
        return productListSize == 1 ?
                firstProductName + "이 주문되었습니다." :
                firstProductName + " 외 " + (productListSize - 1) + "개가 주문되었습니다.";
    }
    @Override
    public void sendNoStock(Customer customer, String productName) {
        String title = "재고부족";
        String content = productName + " - 상품 재고가 부족합니다.";
        String link = "http://localhost:5173/customer/app/product";

        sendMessage(makeOrderMessage(title,content,customer.getFcmToken(),link));
        // TODO: 실제 링크로 변경
        Alarm alarm = Alarm.createAlarm(title, content,link);
        customerAlarmRedisRepository.saveAlarm(String.valueOf(customer.getCustomerId()),alarm);
    }

}
