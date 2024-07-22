package kr.or.kosa.ubun2_be.domain.order.dto;

import lombok.Getter;

@Getter
public class SubscriptionOrderProductRequest {

    private int price;

    private int quantity;

    private Long productId;

    private int discount;
}
