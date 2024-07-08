package kr.or.kosa.ubun2_be.domain.member.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Table(name = "member_customer")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MemberCustomer extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberCustomerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Builder
    private MemberCustomer(Member member, Customer customer) {
        this.member = member;
        this.customer = customer;
    }

    public static MemberCustomer createMemberCustomer(Member member, Customer customer) {
        return MemberCustomer.builder()
                .customer(customer)
                .member(member)
                .build();
    }

}
