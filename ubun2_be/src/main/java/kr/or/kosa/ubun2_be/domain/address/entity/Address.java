package kr.or.kosa.ubun2_be.domain.address.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
@Table(name = "address")
public class Address extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(nullable = false)
    private String addressNickname;

    @Column(nullable = false)
    private String recipientName;

    @Column(nullable = false)
    private String recipientPhone;

    @Column(nullable = false)
    private boolean defaultStatus;

    @Column(nullable = false)
    private String address;

    @OneToMany(mappedBy = "address", fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToMany(mappedBy = "address", fetch = FetchType.LAZY)
    private List<SubscriptionOrder> subscriptionOrders;
}