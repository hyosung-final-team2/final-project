package kr.or.kosa.ubun2_be.domain.alarm.service;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import kr.or.kosa.ubun2_be.domain.alarm.dto.GroupAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.dto.PersonalAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.entity.Alarm;
import kr.or.kosa.ubun2_be.domain.alarm.repository.AlarmRedisRepository;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberCustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
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
    private final AlarmRedisRepository alarmRedisRepository;
    private final MemberCustomerRepository memberCustomerRepository;

    @Override
    public String sendMessageToPersonal(PersonalAlarmSendRequest request) {
        Member member = memberRepository.findById(request.getTargetMemberId())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));

        Message message = makePersonalMessage(request, member.getFcmToken());
        String messageId = sendMessage(message);

        Alarm alarm = Alarm.createAlarm(request.getTitle(), request.getContent());
        alarmRedisRepository.saveAlarm(String.valueOf(member.getMemberId()), alarm);
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

        Alarm alarm = Alarm.createAlarm(request.getTitle(), request.getContent());
        List<Member> members = memberCustomerRepository.findMembersByCustomerId(request.getCustomerId());

        for (Member member : members) {
            alarmRedisRepository.saveAlarm(String.valueOf(member.getMemberId()), alarm);
        }
    }

    @Override
    public List<Alarm> getPushMessages(Long memberId) {
        List<Object> objects = alarmRedisRepository.findAlarmsByMemberId(String.valueOf(memberId));
        return objects.stream()
                .filter(obj -> obj instanceof Alarm)
                .map(obj -> (Alarm) obj)
                .collect(Collectors.toList());
    }

    @Override
    public void markAsRead(Long memberId, String alarmId) {
        alarmRedisRepository.removeAlarmById(String.valueOf(memberId), alarmId);
    }

    private Message makePersonalMessage(PersonalAlarmSendRequest request, String token) {
        return Message.builder()
                .putData("title", request.getTitle())
                .putData("content", request.getContent())
                .setToken(token)
                .build();
    }

    private Message makeGroupMessage(GroupAlarmSendRequest request, String topic) {
        return Message.builder()
                .putData("title", request.getTitle())
                .putData("content", request.getContent())
                .setTopic(topic)
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

}
