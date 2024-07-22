package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import lombok.Builder;
import lombok.Getter;

@Getter
public class RegisterMemberRequest {
    private String pendingMemberName;
    private String pendingMemberEmail;
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
