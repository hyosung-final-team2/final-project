package kr.or.kosa.ubun2_be.global.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;

@Getter
public class EmailAuthenticationRequest {

    @NotBlank(message = "이메일을 입력해주세요")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "이메일 형식에 맞게 입력해주세요")
    private String email;

    @Pattern(regexp = "^\\d{6}$", message = "인증번호 숫자 6자리")
    private String authenticationNumber;
}

