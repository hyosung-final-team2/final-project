package kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CardPaymentRequest {
    private Long memberId;
}
