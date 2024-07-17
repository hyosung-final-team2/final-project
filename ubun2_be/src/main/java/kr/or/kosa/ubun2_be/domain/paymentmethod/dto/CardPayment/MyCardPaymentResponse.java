package kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment;

import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import lombok.Builder;
import lombok.Getter;

@Getter
public class MyCardPaymentResponse {
    private Long paymentMethodId;
    private String paymentType;
    private String cardCompanyName;
    private String cardNumber;
    private String paymentMethodNickname;

    public MyCardPaymentResponse(CardPayment cardPayment) {
        this.paymentMethodId = cardPayment.getPaymentMethodId();
        this.paymentType = cardPayment.getPaymentType();
        this.cardCompanyName = cardPayment.getCardCompanyName();
        this.cardNumber = cardPayment.getCardNumber();
        this.paymentMethodNickname = cardPayment.getPaymentMethodNickname();
    }
}
