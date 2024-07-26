package kr.or.kosa.ubun2_be.domain.alarm.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class PersonalAlarmSendRequest {
    private Long targetMemberId;
    private String title;
    private String content;
    private String link;
}
