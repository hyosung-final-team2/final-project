package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubscriptionApproveRequest {
    private Long subscriptionOrderId;
    private OrderStatus orderStatus;
}
