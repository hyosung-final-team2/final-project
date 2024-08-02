package kr.or.kosa.ubun2_be.domain.alarm.event;

import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import lombok.Getter;

@Getter
public class NoStockEvent {
    private final SubscriptionOrderProduct subscriptionOrderProduct;
    private final Long orderId;

    public NoStockEvent(SubscriptionOrderProduct subscriptionOrderProduct, Long orderId) {
        this.subscriptionOrderProduct = subscriptionOrderProduct;
        this.orderId = orderId;
    }
}
