package kr.or.kosa.ubun2_be.domain.customer.dto;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import lombok.Getter;

@Getter
public class RegisterMemberRequest {
    private String pendingMemberName;
    private String pendingMemberEmail;
    private String pendingMemberPhone;
    private String pendingMemberAddress;
    private String pendingMemberCardCompanyName;
    private String pendingMemberCardNumber;
    private String pendingMemberBankName;
    private String pendingMemberAccountNumber;

    public PendingMember toEntity(Customer customer) {
        return PendingMember.createPendingMember(this, customer);
    }
}
