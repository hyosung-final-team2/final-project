package kr.or.kosa.ubun2_be.domain.alarm.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import kr.or.kosa.ubun2_be.domain.alarm.dto.GroupAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.dto.PersonalAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.List;

@Slf4j
@Component
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService{

    private final MemberRepository memberRepository;
    private final FirebaseMessaging firebaseMessaging;

    @Override
    public String sendMessageToPersonal(PersonalAlarmSendRequest request) {
        Member member = memberRepository.findById(request.getTargetMemberId())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));

        Message message = makePersonalMessage(request, member.getFcmToken());
        String messageId = sendMessage(message);
        return messageId;
    }


    private Message makePersonalMessage(PersonalAlarmSendRequest request, String token) {
        return Message.builder()
                .putData("title", request.getTitle())
                .putData("content", request.getContent())
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
    }

    private Message makeGroupMessage(GroupAlarmSendRequest request, String topic) {
        return Message.builder()
                .putData("title", request.getTitle())
                .putData("content", request.getContent())
                .setTopic(topic)
                .build();
    }

}
