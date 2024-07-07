package kr.or.kosa.ubun2_be.domain.member.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.customer.dto.RegisterMemberRequest;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import lombok.Builder;
import lombok.Getter;

@Entity
@Getter
@Table(name = "pending_member")
public class PendingMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pendingMemberId;

    @Column(nullable = false)
    private String pendingMemberName;

    @Column(nullable = false, unique = true)
    private String pendingMemberEmail;

    @Column(nullable = false)
    private String pendingMemberPhone;

    @Column
    private String pendingMemberAddress;

    @Column
    private String pendingMemberCardCompanyName;

    @Column
    private String pendingMemberCardNumber;

    @Column
    private String pendingMemberBankName;

    @Column
    private String pendingMemberAccountNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Builder
    private PendingMember(String pendingMemberName, String pendingMemberEmail, String pendingMemberPhone, String pendingMemberAddress, String pendingMemberCardCompanyName, String pendingMemberCardNumber, String pendingMemberBankName, String pendingMemberAccountNumber, Customer customer) {
        this.pendingMemberName = pendingMemberName;
        this.pendingMemberEmail = pendingMemberEmail;
        this.pendingMemberPhone = pendingMemberPhone;
        this.pendingMemberAddress = pendingMemberAddress;
        this.pendingMemberCardCompanyName = pendingMemberCardCompanyName;
        this.pendingMemberCardNumber = pendingMemberCardNumber;
        this.pendingMemberBankName = pendingMemberBankName;
        this.pendingMemberAccountNumber = pendingMemberAccountNumber;
        this.customer = customer;
    }

    public static PendingMember createPendingMember(RegisterMemberRequest registerMemberRequest, Customer customer) {
        return PendingMember.builder()
                .pendingMemberName(registerMemberRequest.getPendingMemberName())
                .pendingMemberEmail(registerMemberRequest.getPendingMemberEmail())
                .pendingMemberPhone(registerMemberRequest.getPendingMemberPhone())
                .pendingMemberAddress(registerMemberRequest.getPendingMemberAddress())
                .pendingMemberAddress(registerMemberRequest.getPendingMemberAddress())
                .pendingMemberCardCompanyName(registerMemberRequest.getPendingMemberCardCompanyName())
                .pendingMemberCardNumber(registerMemberRequest.getPendingMemberCardNumber())
                .pendingMemberBankName(registerMemberRequest.getPendingMemberBankName())
                .pendingMemberAccountNumber(registerMemberRequest.getPendingMemberAccountNumber())
                .customer(customer)
                .build();
    }
}
