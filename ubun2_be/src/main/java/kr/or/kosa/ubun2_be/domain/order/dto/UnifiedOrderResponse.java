package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UnifiedOrderResponse {
    private Long orderId;
    private String orderStatus;
    private String createdAt;
    private String memberName;
    private String paymentType;
    private int totalOrderPrice;
    private boolean isSubscription;

    public UnifiedOrderResponse(Order order) {
        this.orderId = order.getOrderId();
        this.orderStatus = order.getOrderStatus().name();
        this.createdAt = order.getCreatedAt().toString();
        this.memberName = order.getMember().getMemberName();
        this.totalOrderPrice = calculateTotalOrderPrice(order);
        this.isSubscription = false;
        setPaymentType(order.getPaymentMethod());
    }

    public UnifiedOrderResponse(SubscriptionOrder subscriptionOrder) {
        this.orderId = subscriptionOrder.getSubscriptionOrderId();
        this.orderStatus = subscriptionOrder.getOrderStatus().name();
        this.createdAt = subscriptionOrder.getCreatedAt().toString();
        this.memberName = subscriptionOrder.getMember().getMemberName();
        this.totalOrderPrice = calculateTotalSubscriptionOrderPrice(subscriptionOrder);
        this.isSubscription = true;
        setPaymentType(subscriptionOrder.getPaymentMethod());
    }

    private int calculateTotalOrderPrice(Order order) {
        return order.getOrderProducts().stream()
                .mapToInt(op -> new OrderProductResponse(op).getTotalPrice())
                .sum();
    }

    private int calculateTotalSubscriptionOrderPrice(SubscriptionOrder subscriptionOrder) {
        return subscriptionOrder.getSubscriptionOrderProducts().stream()
                .mapToInt(op -> new SubscriptionOrderProductResponse(op).getTotalPrice())
                .sum();
    }

    private void setPaymentType(Object paymentMethod) {
        if (paymentMethod instanceof AccountPayment) {
            this.paymentType = "ACCOUNT";
        } else if (paymentMethod instanceof CardPayment) {
            this.paymentType = "CARD";
        }
    }
}