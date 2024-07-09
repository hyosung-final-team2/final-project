package kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CardPaymentResponse {
    private Long paymentMethodId;
    private String memberEmail;
    private String memberName;
    private String paymentType;
    private String cardCompanyName;
    private String cardNumber;
}