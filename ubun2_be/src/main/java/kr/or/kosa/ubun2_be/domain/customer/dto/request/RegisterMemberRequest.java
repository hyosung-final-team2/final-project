package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import lombok.Builder;
import lombok.Getter;

@Getter
public class RegisterMemberRequest {

    @NotBlank(message = "이름을 입력해주세요")
    @Pattern(regexp = "[가-힣a-zA-Z]+", message = "이름을 입력해주세요")
    private String pendingMemberName;

    @NotBlank(message = "이메일을 입력해주세요")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "이메일 형식에 맞게 입력해주세요")
    private String pendingMemberEmail;

    @NotBlank(message = "전화번호를 입력해주세요")
    @Pattern(regexp = "^(010|011|016|017|018|019)-\\d{3,4}-\\d{4}$", message = "ex) 010-1234-5678")
    private String pendingMemberPhone;

    public PendingMember toEntity(Customer customer) {
        return PendingMember.createPendingMember(this, customer);
    }

    @Builder
    private RegisterMemberRequest(String pendingMemberName, String pendingMemberEmail, String pendingMemberPhone) {
        this.pendingMemberName = pendingMemberName;
        this.pendingMemberEmail = pendingMemberEmail;
        this.pendingMemberPhone = pendingMemberPhone;
    }

    public static RegisterMemberRequest createRegisterMemberRequest(String pendingMemberEmail, String pendingMemberName, String pendingMemberPhone) {
        return RegisterMemberRequest.builder()
                .pendingMemberEmail(pendingMemberEmail)
                .pendingMemberName(pendingMemberName)
                .pendingMemberPhone(pendingMemberPhone)
                .build();
    }
}
