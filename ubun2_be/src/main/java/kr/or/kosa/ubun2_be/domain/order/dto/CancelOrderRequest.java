package kr.or.kosa.ubun2_be.domain.order.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CancelOrderRequest {
    private Long customerId;
    private Long orderId;
}