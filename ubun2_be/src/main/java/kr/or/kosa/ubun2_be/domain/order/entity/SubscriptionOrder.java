package kr.or.kosa.ubun2_be.domain.order.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@Builder
@AllArgsConstructor
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

    @Column
    private LocalDateTime nextOrderDate; //다음 결제일

    @OneToMany(mappedBy = "subscriptionOrder", cascade = CascadeType.ALL)
    private List<SubscriptionOrderProduct> subscriptionOrderProducts;

    public void addSubscriptionOrderProducts(List<SubscriptionOrderProduct> subscriptionOrderProducts) {
        this.subscriptionOrderProducts.addAll(subscriptionOrderProducts);
    }

    public void createSubscriptionOrderProducts(List<SubscriptionOrderProduct> subscriptionOrderProducts) {
        this.subscriptionOrderProducts = subscriptionOrderProducts;
    }

    // OrderStatus 변경 메서드
    public void changeOrderStatus(OrderStatus newOrderStatus) {
        this.orderStatus = newOrderStatus;
    }

    //nextOrderDate 변경
    public void changeNextOrderDate() {
        this.nextOrderDate = this.nextOrderDate.plusDays(this.intervalDays);
    }

    public int getMaxCycleNumber() {
        return this.subscriptionOrderProducts.stream()
                .mapToInt(SubscriptionOrderProduct::getCycleNumber)
                .max()
                .orElse(0);
    }

}
