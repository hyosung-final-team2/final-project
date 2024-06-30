package kr.or.kosa.ubun2_be.domain.order.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import lombok.Getter;

import java.util.List;

@Entity
@Getter
@Table(name = "subscription_order")
public class SubscriptionOrder extends BaseTimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subscriptionOrderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Column(nullable = false)
    private int intervalDays;

//    @Column(nullable = false)
//    private int totalCycles;
//
//    @Column(nullable = false)
//    private int remainingCycles;

    @OneToMany(mappedBy = "subscriptionOrder", cascade = CascadeType.ALL)
    private List<SubscriptionOrderProduct> subscriptionOrderProducts;


}
