package kr.or.kosa.ubun2_be.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.enums.OrderStatusType;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "order_status")
public class OrderStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long orderStatusId;

    @Enumerated(EnumType.STRING)
    private OrderStatusType orderStatusName;

    @OneToMany(mappedBy = "orderStatus", fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToMany(mappedBy = "orderStatus", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<SubscriptionOrder> subscriptionOrders = new ArrayList<>();

}
