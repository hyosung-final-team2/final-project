package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterPaymentMethodRequest {

    private String cardCompanyName;

    @NotBlank(message = "결제수단 종류를 입력해주세요")
    private String paymentType;

    @Pattern(regexp = "^(\\d{4}[-\\s]?){3}\\d{4}$")
    private String cardNumber;

    private String paymentMethodNickname;

    private String bankName;

    @Pattern(regexp = "^\\d{3,6}-?\\d{2,6}-?\\d{3,6}$")
    private String accountNumber;

    private String cardPassword;

    private String accountPassword;

    private String cardExpirationDate;

    private String cvc;
}
