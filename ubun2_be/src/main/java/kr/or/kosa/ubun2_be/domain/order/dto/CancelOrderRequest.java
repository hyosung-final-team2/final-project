package kr.or.kosa.ubun2_be.domain.order.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
public class CancelOrderRequest {

    @NotNull(message = "customerId는 필수값입니다.")
    @Positive
    private Long customerId;

    @NotNull(message = "orderId는 필수값입니다.")
    @Positive
    private Long orderId;
}