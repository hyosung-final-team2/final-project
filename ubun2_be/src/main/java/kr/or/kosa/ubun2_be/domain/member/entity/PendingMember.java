package kr.or.kosa.ubun2_be.domain.member.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
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

    @Column(nullable = false)
    private String pendingMemberEmail;

    @Column(nullable = false)
    private String pendingMemberPhone;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
}
