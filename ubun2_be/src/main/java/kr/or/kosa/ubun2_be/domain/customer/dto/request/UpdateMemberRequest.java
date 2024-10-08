package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import kr.or.kosa.ubun2_be.domain.address.dto.MemberDetailAddressRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.MemberDetailPaymentMethodRequest;
import lombok.Getter;

import java.util.List;

@Getter
public class UpdateMemberRequest {

    @NotBlank(message = "이름을 입력해주세요")
    @Pattern(regexp = "[가-힣a-zA-Z]+", message = "이름을 입력해주세요")
    private String memberName;

    @NotBlank(message = "이메일을 입력해주세요")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "이메일 형식에 맞게 입력해주세요")
    private String memberEmail;

    @NotBlank(message = "전화번호를 입력해주세요")
    @Pattern(regexp = "^(010|011|016|017|018|019)-\\d{3,4}-\\d{4}$", message = "ex) 010-1234-5678")
    private String memberPhone;

    private List<MemberDetailAddressRequest> addresses;

    private List<MemberDetailPaymentMethodRequest> paymentMethods;
}
