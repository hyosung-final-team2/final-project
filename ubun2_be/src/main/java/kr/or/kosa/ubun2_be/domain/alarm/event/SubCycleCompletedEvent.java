package kr.or.kosa.ubun2_be.domain.alarm.event;

import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import lombok.Getter;

@Getter
public class SubCycleCompletedEvent {
    private final SubscriptionOrder subscriptionOrder;
    private final String delayReason;

    public SubCycleCompletedEvent(SubscriptionOrder subscriptionOrder, String delayReason) {
        this.subscriptionOrder = subscriptionOrder;
        this.delayReason = delayReason;
    }
}
