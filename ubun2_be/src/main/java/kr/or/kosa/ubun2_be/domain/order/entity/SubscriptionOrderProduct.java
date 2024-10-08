package kr.or.kosa.ubun2_be.domain.order.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import lombok.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@AllArgsConstructor
@Table(name = "subscription_order_product")
public class SubscriptionOrderProduct extends BaseTimeEntity {
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

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderProductStatus orderProductStatus;

    @Column
    private int discount;

    public void changeSubscriptionOrderProductStatus(OrderProductStatus newStatus) {
        this.orderProductStatus = newStatus;
    }
}

