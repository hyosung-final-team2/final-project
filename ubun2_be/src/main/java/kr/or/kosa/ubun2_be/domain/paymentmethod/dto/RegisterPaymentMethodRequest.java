package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import lombok.Getter;

@Getter
public class RegisterPaymentMethodRequest {
    private String cardCompanyName;
    private String paymentType;
    private String cardNumber;
    private String paymentMethodNickname;
    private String bankName;
    private String accountNumber;
}
