package kr.or.kosa.ubun2_be.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "subscription_order_product")
public class SubscriptionOrderProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long subscriptionOrderProductId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "subscription_order_id", nullable = false)
    private SubscriptionOrder subscriptionOrder;

    @Column(nullable = false)
    private int cycleNumber;

    @Column(nullable = false)
    private int price;

    @Column(nullable = false)
    private int quantity;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_product_status_id", nullable = false)
    private OrderProductStatus orderProductStatus;

    @Column(nullable = false)
    private LocalDateTime createdAt;

}

