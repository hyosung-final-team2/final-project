package kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment;

import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
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

    public AccountPaymentResponse(AccountPayment accountPayment) {
        this.paymentMethodId = accountPayment.getPaymentMethodId();
        this.memberEmail = accountPayment.getMember().getMemberEmail();
        this.memberName = accountPayment.getMember().getMemberName();
        this.paymentType = accountPayment.getPaymentType();
        this.bankName = accountPayment.getBankName();
        this.accountNumber = accountPayment.getAccountNumber();
    }
}