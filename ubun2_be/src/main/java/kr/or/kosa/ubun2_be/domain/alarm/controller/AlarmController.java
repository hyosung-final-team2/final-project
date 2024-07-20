package kr.or.kosa.ubun2_be.domain.alarm.controller;


import io.swagger.v3.oas.annotations.Operation;
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

}
