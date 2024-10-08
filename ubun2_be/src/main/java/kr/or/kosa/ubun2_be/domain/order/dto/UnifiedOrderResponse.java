package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UnifiedOrderResponse {
    private Long orderId;
    private String orderStatus;
    private String createdAt;
    private String memberName;
    private Long memberId;
    private String paymentType;
    private int totalOrderPrice;
    private boolean isSubscription;
    private List<OrderProductResponse> orderProducts;
    private List<SubscriptionOrderProductResponse> subscriptionOrderProducts;

    public UnifiedOrderResponse(Order order) {
        this.orderId = order.getOrderId();
        this.orderStatus = order.getOrderStatus().name();
        this.createdAt = order.getCreatedAt().toString();
        this.memberName = order.getMember().getMemberName();
        this.memberId = order.getMember().getMemberId();
        this.totalOrderPrice = calculateTotalOrderPrice(order);
        this.isSubscription = false;
        this.orderProducts = order.getOrderProducts().stream()
                .map(OrderProductResponse::of)
                .collect(Collectors.toList());
        this.paymentType = order.getPaymentMethod().getPaymentType();
    }

    public UnifiedOrderResponse(SubscriptionOrder subscriptionOrder) {
        this.orderId = subscriptionOrder.getSubscriptionOrderId();
        this.orderStatus = subscriptionOrder.getOrderStatus().name();
        this.createdAt = subscriptionOrder.getCreatedAt().toString();
        this.memberName = subscriptionOrder.getMember().getMemberName();
        this.memberId = subscriptionOrder.getMember().getMemberId();
        this.totalOrderPrice = calculateTotalSubscriptionOrderPrice(subscriptionOrder);
        this.isSubscription = true;
        this.subscriptionOrderProducts = subscriptionOrder.getSubscriptionOrderProducts().stream()
                .map(SubscriptionOrderProductResponse::of)
                .collect(Collectors.toList());
        this.paymentType = subscriptionOrder.getPaymentMethod().getPaymentType();
    }

    private int calculateTotalOrderPrice(Order order) {
        return order.getOrderProducts().stream()
                .mapToInt(op -> {
                    int discountedPrice = op.getPrice() - (int) (op.getPrice() * (op.getDiscount() / 100.0));
                    return discountedPrice * op.getQuantity();
                })
                .sum();
    }

    private int calculateTotalSubscriptionOrderPrice(SubscriptionOrder subscriptionOrder) {
        return subscriptionOrder.getSubscriptionOrderProducts().stream()
                .mapToInt(op -> {
                    int discountedPrice = op.getPrice() - (int) (op.getPrice() * (op.getDiscount() / 100.0));
                    return discountedPrice * op.getQuantity();
                })
                .sum();
    }
}