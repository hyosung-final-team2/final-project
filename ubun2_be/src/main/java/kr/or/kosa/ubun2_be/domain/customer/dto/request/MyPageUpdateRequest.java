package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MyPageUpdateRequest {

    @NotBlank(message = "이름을 입력해주세요")
    @Pattern(regexp = "[가-힣a-zA-Z]+", message = "이름을 입력해주세요")
    private String customerName;

    @Pattern(regexp = "",message = "올바른 전화번호 형식이 아닙니다.")
    private String customerPhone;

    @NotBlank(message = "사업장 주소를 입력해주세요")
    private String businessAddress;

    private String description;

    private String announcement;
}
