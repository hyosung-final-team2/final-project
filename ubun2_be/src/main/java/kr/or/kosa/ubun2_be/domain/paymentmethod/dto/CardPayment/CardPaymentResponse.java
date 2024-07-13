package kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment;

import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import lombok.Getter;

@Getter
public class CardPaymentResponse {
    private Long memberId;
    private Long paymentMethodId;
    private String memberEmail;
    private String memberName;
    private String paymentType;
    private String cardCompanyName;
    private String cardNumber;

    public CardPaymentResponse(CardPayment cardPayment) {
        this.memberId = cardPayment.getMember().getMemberId();
        this.paymentMethodId = cardPayment.getPaymentMethodId();
        this.memberEmail = cardPayment.getMember().getMemberEmail();
        this.memberName = cardPayment.getMember().getMemberName();
        this.paymentType = cardPayment.getPaymentType();
        this.cardCompanyName = cardPayment.getCardCompanyName();
        this.cardNumber = cardPayment.getCardNumber();
    }
}