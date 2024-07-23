package kr.or.kosa.ubun2_be.domain.alarm.controller;


import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.alarm.dto.GroupAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.dto.PersonalAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.entity.Alarm;
import kr.or.kosa.ubun2_be.domain.alarm.service.AlarmService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AlarmController {

    private final AlarmService alarmService;

    @Operation(summary = "단일 구매자에게 알람 보내기")
    @PostMapping("/customers/alarm/personal")
    public ResponseDto<?> pushMessagePersonal(@RequestBody PersonalAlarmSendRequest request) {
        String messageId = alarmService.sendMessageToPersonal(request);
        return ResponseDto.ok(messageId,"개인 알람 전송 성공");
    }

    @Operation(summary = "고객의 상점에 구독되어있는 회원 전체에게 알람 보내기")
    @PostMapping("/customers/alarm/group")
    public ResponseDto<?> pushMessageGroup(@RequestBody GroupAlarmSendRequest request) {
        alarmService.sendMessageToGroup(request);
        return ResponseDto.ok(null,"토픽 알람 전송 성공");
    }

    @Operation(summary = "회원별 알림 조회")
    @GetMapping("/members/alarm/{memberId}")
    public ResponseDto<List<Alarm>> getMemberPushMessages(@PathVariable Long memberId) {
        List<Alarm> alarms = alarmService.getMemberPushMessages(memberId);
        return ResponseDto.ok(alarms, "메시지 조회 성공");
    }

    @Operation(summary = "알림 읽음 처리")
    @DeleteMapping("/members/alarm/{memberId}/{alarmId}")
    public ResponseDto<?> markAlarmAsRead(@PathVariable Long memberId, @PathVariable String alarmId) {
        alarmService.markAsRead(memberId, alarmId);
        return ResponseDto.ok(null, "알림 읽음 처리 완료");
    }

    @Operation(summary = "고객별 알림 조회")
    @GetMapping("/customers/alarm/{customerId}")
    public ResponseDto<List<Alarm>> getCustomerPushMessages(@PathVariable Long customerId) {
        List<Alarm> alarms = alarmService.getCustomerPushMessages(customerId);
        return ResponseDto.ok(alarms, "메시지 조회 성공");
    }
}