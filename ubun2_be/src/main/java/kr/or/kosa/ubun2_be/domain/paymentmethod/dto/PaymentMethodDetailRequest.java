package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PaymentMethodDetailRequest {

    @NotNull(message = "paymentMethodId는 필수값입니다.")
    @Positive
    private Long paymentMethodId;
}
