package kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment;

import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import lombok.Getter;

@Getter
public class AccountPaymentResponse {
    private Long memberId;
    private Long paymentMethodId;
    private String memberEmail;
    private String memberName;
    private String paymentType;
    private String bankName;
    private String accountNumber;

    public AccountPaymentResponse(AccountPayment accountPayment) {
        this.memberId = accountPayment.getMember().getMemberId();
        this.paymentMethodId = accountPayment.getPaymentMethodId();
        this.memberEmail = accountPayment.getMember().getMemberEmail();
        this.memberName = accountPayment.getMember().getMemberName();
        this.paymentType = accountPayment.getPaymentType();
        this.bankName = accountPayment.getBankName();
        this.accountNumber = accountPayment.getAccountNumber();
    }
}