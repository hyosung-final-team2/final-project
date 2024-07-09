package kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AccountPaymentResponse {
    private Long paymentMethodId;
    private String memberEmail;
    private String memberName;
    private String paymentType;
    private String bankName;
    private String accountNumber;
}