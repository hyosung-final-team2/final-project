package kr.or.kosa.ubun2_be.domain.alarm.controller;


import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.alarm.dto.GroupAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.dto.PersonalAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.service.AlarmService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/alarm")
@RequiredArgsConstructor
public class AlarmController {

    private final AlarmService alarmService;

    @Operation(summary = "단일 구매자에게 알람 보내기")
    @PostMapping("/personal")
    public ResponseDto<?> pushMessagePersonal(@RequestBody PersonalAlarmSendRequest request) {
        String messageId = alarmService.sendMessageToPersonal(request);
        return ResponseDto.ok(messageId,"개인 알람 전송 성공");
    }

    @Operation(summary = "고객의 상점에 구독되어있는 회원 전체에게 알람 보내기")
    @PostMapping("/group")
    public ResponseDto<?> pushMessageGroup(@RequestBody GroupAlarmSendRequest request) {
        alarmService.sendMessageToGroup(request);
        return ResponseDto.ok(null,"토픽 알람 전송 성공");
    }
}
