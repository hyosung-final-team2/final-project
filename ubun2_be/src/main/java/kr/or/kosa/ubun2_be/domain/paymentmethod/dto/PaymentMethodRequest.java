package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentMethodRequest {

    @NotNull(message = "memberId는 필수값입니다.")
    @Positive
    private Long memberId;

    @NotBlank(message = "결제수단 종류를 입력해주세요")
    private String paymentType;

    private String cardCompanyName;

    @Pattern(regexp = "^(\\d{4}[-\\s]?){3}\\d{4}$")
    private String cardNumber;

    @Pattern(regexp = "^\\d{3,6}-?\\d{2,6}-?\\d{3,6}$")
    private String accountNumber;


    private String bankName;

}