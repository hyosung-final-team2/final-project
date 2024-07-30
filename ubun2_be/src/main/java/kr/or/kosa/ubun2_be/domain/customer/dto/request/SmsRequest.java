package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SmsRequest {

    @NotBlank(message = "전화번호를 입력해주세요")
    @Pattern(regexp = "^(010|011|016|017|018|019)-\\d{3,4}-\\d{4}$", message = "ex) 010-1234-5678")
    private String phoneNumber;

    @NotBlank(message = "이름을 입력해주세요")
    @Pattern(regexp = "[가-힣a-zA-Z]+",message = "이름을 입력해주세요")
    private String memberName;
}
