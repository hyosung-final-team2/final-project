package kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccountPaymentRequest {
    private Long memberId;
}
