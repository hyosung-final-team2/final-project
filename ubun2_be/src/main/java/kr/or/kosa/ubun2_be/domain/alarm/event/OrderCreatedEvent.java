package kr.or.kosa.ubun2_be.domain.alarm.event;

import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderRequest;
import lombok.Getter;

@Getter
public class OrderCreatedEvent {
    private final SubscriptionOrderRequest orderRequest;

    public OrderCreatedEvent(SubscriptionOrderRequest orderRequest) {
        this.orderRequest = orderRequest;
    }

}
