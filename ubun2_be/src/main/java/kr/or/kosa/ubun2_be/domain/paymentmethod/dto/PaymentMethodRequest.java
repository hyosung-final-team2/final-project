package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentMethodRequest {
    private Long memberId;
    private String paymentType;
    private String cardCompanyName;
    private String cardNumber;
    private String accountNumber;
    private String bankName;

}