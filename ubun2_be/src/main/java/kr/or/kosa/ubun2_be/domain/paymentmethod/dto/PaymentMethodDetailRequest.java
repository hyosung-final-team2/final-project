package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PaymentMethodDetailRequest {
    private Long paymentMethodId;
}
