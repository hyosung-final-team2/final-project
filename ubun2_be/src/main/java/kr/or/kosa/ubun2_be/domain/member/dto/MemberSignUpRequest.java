package kr.or.kosa.ubun2_be.domain.member.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberSignUpRequest {

    @NotBlank(message = "로그인 ID를 입력해주세요")
    @Pattern(regexp = "^[A-Za-z0-9]{6,}$", message = "알파벳과 숫자 6자리 이상")
    private String memberLoginId;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "알파벳, 숫자, 특수문자를 포함한 8자리 이상")
    private String memberPassword;

    @NotBlank(message = "이름을 입력해주세요")
    @Pattern(regexp = "[가-힣a-zA-Z]+", message = "이름을 입력해주세요")
    private String memberName;

    @NotBlank(message = "이메일을 입력해주세요")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "이메일 형식에 맞게 입력해주세요")
    private String memberEmail;

    @NotBlank(message = "전화번호를 입력해주세요")
    @Pattern(regexp = "^(010|011|016|017|018|019)-\\d{3,4}-\\d{4}$", message = "ex) 010-1234-5678")
    private String memberPhone;

    @NotBlank(message = "fcmToken을 입력해주세요")
    private String fcmToken;

    public Member toEntity(){
        return Member.builder().memberEmail(memberEmail)
                .memberLoginId(memberLoginId)
                .memberPassword(memberPassword)
                .memberName(memberName)
                .memberPhone(memberPhone)
                .fcmToken(fcmToken)
                .build();
    }
}
