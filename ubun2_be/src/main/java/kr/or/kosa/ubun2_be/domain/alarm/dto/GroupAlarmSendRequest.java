package kr.or.kosa.ubun2_be.domain.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class GroupAlarmSendRequest {
    private Long customerId;
    private String title;
    private String content;
    private String link;
}
