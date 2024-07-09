package kr.or.kosa.ubun2_be.domain.member.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.RegisterMemberRequest;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.UpdatePendingMemberRequest;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "pending_member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PendingMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pendingMemberId;

    @Column(nullable = false)
    private String pendingMemberName;

    @Column(nullable = false)
    private String pendingMemberEmail;

    @Column(nullable = false)
    private String pendingMemberPhone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Builder
    private PendingMember(String pendingMemberName, String pendingMemberEmail, String pendingMemberPhone, String pendingMemberAddress, String pendingMemberCardCompanyName, String pendingMemberCardNumber, String pendingMemberBankName, String pendingMemberAccountNumber, Customer customer) {
        this.pendingMemberName = pendingMemberName;
        this.pendingMemberEmail = pendingMemberEmail;
        this.pendingMemberPhone = pendingMemberPhone;
        this.customer = customer;
    }

    public static PendingMember createPendingMember(RegisterMemberRequest registerMemberRequest, Customer customer) {
        return PendingMember.builder()
                .pendingMemberName(registerMemberRequest.getPendingMemberName())
                .pendingMemberEmail(registerMemberRequest.getPendingMemberEmail())
                .pendingMemberPhone(registerMemberRequest.getPendingMemberPhone())
                .customer(customer)
                .build();
    }

    public void updatePendingMember(UpdatePendingMemberRequest updatePendingMemberRequest) {
        this.pendingMemberName = updatePendingMemberRequest.getPendingMemberName();
        this.pendingMemberEmail = updatePendingMemberRequest.getPendingMemberEmail();
        this.pendingMemberPhone = updatePendingMemberRequest.getPendingMemberPhone();
    }
}
