package kr.or.kosa.ubun2_be.global.auth.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class FindPasswordRequest {

    @NotBlank(message = "이름을 입력해주세요")
    @Pattern(regexp = "[가-힣a-zA-Z]+", message = "이름을 입력해주세요")
    private String userName;

    @NotBlank(message = "이메일을 입력해주세요")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "이메일 형식에 맞게 입력해주세요")
    private String userEmail;

    @NotBlank(message = "로그인 ID를 입력해주세요")
    @Pattern(regexp = "^[A-Za-z0-9]{6,}$", message = "알파벳과 숫자 6자리 이상")
    private String userLoginId;

    @NotBlank(message = "role 입력해주세요")
    private String role;
}
