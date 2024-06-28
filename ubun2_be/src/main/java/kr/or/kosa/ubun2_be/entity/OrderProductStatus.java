package kr.or.kosa.ubun2_be.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.enums.OrderProductStatusType;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "order_product_status")
public class OrderProductStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderProductStatusId;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderProductStatusType orderProductStatusName;

    @OneToMany(mappedBy = "orderProductStatus", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<OrderProduct> orderProducts = new ArrayList<>();

    @OneToMany(mappedBy = "orderProductStatus", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SubscriptionOrderProduct> subscriptionOrderProducts = new ArrayList<>();


}