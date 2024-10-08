package kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment;

import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MyAccountPaymentResponse {
    private Long paymentMethodId;
    private String paymentType;
    private String bankName;
    private String accountNumber;
    private String paymentMethodNickname;
    private boolean defaultStatus;

    public MyAccountPaymentResponse(AccountPayment accountPayment) {
        this.paymentMethodId = accountPayment.getPaymentMethodId();
        this.paymentType = accountPayment.getPaymentType();
        this.bankName = accountPayment.getBankName();
        this.accountNumber = accountPayment.getAccountNumber();
        this.paymentMethodNickname = accountPayment.getPaymentMethodNickname();
        this.defaultStatus = accountPayment.isDefaultStatus();
    }
}
