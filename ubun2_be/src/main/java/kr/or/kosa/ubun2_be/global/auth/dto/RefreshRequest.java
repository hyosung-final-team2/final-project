package kr.or.kosa.ubun2_be.global.auth.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class RefreshRequest {

    @NotBlank(message = "refreshToken을 입력해주세요")
    private String refreshToken;
}
