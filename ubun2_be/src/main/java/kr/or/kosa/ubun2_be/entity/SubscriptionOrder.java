package kr.or.kosa.ubun2_be.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Table(name = "subscription_order")
public class SubscriptionOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subscriptionOrderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod;

    @Column(nullable = false)
    private Long paymentMethodDetailId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "address_id", nullable = false)
    private Address address;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_status_id", nullable = false)
    private OrderStatus orderStatus;

    @Column(nullable = false)
    private int intervalDays;

    @Column(nullable = false)
    private int totalCycles;

    @Column(nullable = false)
    private int remainingCycles;

    @OneToMany(mappedBy = "subscriptionOrder", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SubscriptionOrderProduct> subscriptionOrderProducts;


}
