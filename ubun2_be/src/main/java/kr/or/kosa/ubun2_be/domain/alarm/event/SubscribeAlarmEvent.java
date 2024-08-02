package kr.or.kosa.ubun2_be.domain.alarm.event;

import lombok.Getter;

@Getter
public class SubscribeAlarmEvent {
    private final String fcmToken;
    private final Long customerId;

    public SubscribeAlarmEvent(String fcmToken, Long customerId) {
        this.fcmToken = fcmToken;
        this.customerId = customerId;
    }
}
