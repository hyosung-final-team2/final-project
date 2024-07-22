package kr.or.kosa.ubun2_be.domain.order.dto;

import lombok.Getter;

@Getter
public class CancelOrderRequest {
    private Long customerId;
    private Long orderId;
}