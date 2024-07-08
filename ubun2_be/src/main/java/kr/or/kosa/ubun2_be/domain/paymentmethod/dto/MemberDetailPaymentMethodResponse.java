package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberDetailPaymentMethodResponse {
    private Long paymentMethodId;
    private String accountNumber;
    private String bankName;
    private String cardCompanyName;
    private String cardNumber;
}