package kr.or.kosa.ubun2_be.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "payment_method")
public class PaymentMethod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentMethodId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToMany(mappedBy = "paymentMethod", fetch = FetchType.LAZY)
    private List<CardPayment> cardPayments;

    @OneToMany(mappedBy = "paymentMethod", fetch = FetchType.LAZY)
    private List<AccountPayment> accountPayments;

    @OneToMany(mappedBy = "paymentMethod", fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToMany(mappedBy = "paymentMethod", fetch = FetchType.LAZY)
    private List<SubscriptionOrder> subscriptionOrders;

    // subscriptionorder


}

