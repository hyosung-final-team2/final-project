package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class UpdatePaymentMethodRequest {

    @NotBlank(message = "결제수단 별칭을 입력해주세요")
    private String paymentMethodNickname;
}
