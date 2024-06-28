package kr.or.kosa.ubun2_be.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "member_customer")
public class MemberCustomer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberCustomerId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

}
