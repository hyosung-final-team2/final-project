package kr.or.kosa.ubun2_be.domain.alarm.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import kr.or.kosa.ubun2_be.domain.alarm.dto.PersonalAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AlarmServiceImpl implements AlarmService{
    private final String API_URL = "https://fcm.googleapis.com/v1/projects/ubun2-e6c7c/messages:send";
    private final ObjectMapper objectMapper;
    private final MemberRepository memberRepository;
    private final FirebaseMessaging firebaseMessaging;


    @Override
    public String sendMessageToPersonal(PersonalAlarmSendRequest request) {
        Member member = memberRepository.findById(request.getTargetMemberId())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));

        Message message = makePersonalMessage(request, member.getFcmToken());
        System.out.println(member.getFcmToken());
        String messageId = sendMessage(message);
        return messageId;
    }


    private Message makePersonalMessage(PersonalAlarmSendRequest request, String token) {
        System.out.println(request.toString());
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
}
