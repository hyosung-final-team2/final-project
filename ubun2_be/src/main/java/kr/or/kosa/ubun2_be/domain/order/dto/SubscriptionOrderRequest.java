package kr.or.kosa.ubun2_be.domain.order.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class SubscriptionOrderRequest {
    private Long customerId;

    private Long paymentMethodId;

    private String paymentType;

    private Long addressId;

    private int intervalDays;

    private List<SubscriptionOrderProductRequest> subscriptionOrderProducts;

}
