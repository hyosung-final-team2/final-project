package kr.or.kosa.ubun2_be.domain.member.dto;

import lombok.Getter;

@Getter
public class PaymentPasswordRequest {
//
//    @NotBlank
//    @Pattern(regexp = "^\\d{6}$", message = "간편 결제 비밀번호를 입력해주세요")
    private String paymentPassword;
}
