package kr.or.kosa.ubun2_be.global.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class CheckLoginIdRequest {

    @NotBlank(message = "role 입력해주세요")
    private String userType; // "ROLE_CUSTOMER" or "ROLE_MEMBER"

    @NotBlank(message = "로그인 ID를 입력해주세요")
    @Pattern(regexp = "^[A-Za-z0-9]{6,}$", message = "알파벳과 숫자 6자리 이상")
    private String loginId;
}
