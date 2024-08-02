package kr.or.kosa.ubun2_be.domain.alarm.event;

import lombok.Getter;

@Getter
public class UnSubscribeAlarmEvent {
    private final String fcmToken;
    private final Long customerId;

    public UnSubscribeAlarmEvent(String fcmToken, Long customerId) {
        this.fcmToken = fcmToken;
        this.customerId = customerId;
    }
}
