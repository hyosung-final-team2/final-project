package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberPaymentMethodsResponse {
    private Long paymentMethodId;
    private String accountNumber;
    private String bankName;
    private String cardCompanyName;
    private String cardNumber;
    private String paymentType;
}
