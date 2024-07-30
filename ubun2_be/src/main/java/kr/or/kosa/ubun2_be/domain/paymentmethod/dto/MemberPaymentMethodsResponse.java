package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodException;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodExceptionType;
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

    private MemberPaymentMethodsResponse(CardPayment cardPayment) {
        this.paymentMethodId = cardPayment.getPaymentMethodId();
        this.paymentType = cardPayment.getPaymentType();
        this.cardNumber = cardPayment.getCardNumber();
        this.cardCompanyName = cardPayment.getCardCompanyName();
        this.bankName = null;
        this.accountNumber = null;
    }

    private MemberPaymentMethodsResponse(AccountPayment accountPayment) {
        this.paymentMethodId = accountPayment.getPaymentMethodId();
        this.paymentType = accountPayment.getPaymentType();
        this.accountNumber = accountPayment.getAccountNumber();
        this.bankName = accountPayment.getBankName();
        this.cardCompanyName = null;
        this.cardNumber = null;
    }

    public static MemberPaymentMethodsResponse from(PaymentMethod paymentMethod) {
        if (paymentMethod instanceof CardPayment) {
            return new MemberPaymentMethodsResponse((CardPayment) paymentMethod);
        } else if (paymentMethod instanceof AccountPayment) {
            return new MemberPaymentMethodsResponse((AccountPayment) paymentMethod);
        } else {
            throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_PAYMENT_TYPE);
        }
    }
}
