package kr.or.kosa.ubun2_be.domain.dashboard.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class UnifiedOrderResponse {
    private Long orderId;
    private String orderStatus;
    private String createdAt;
    private String memberName;
    private String paymentType;
    private int totalOrderPrice;
    private boolean isSubscription;
    private List<OrderProductResponse> orderProducts;
    private List<SubscriptionOrderProductResponse> subscriptionOrderProducts;

    public static UnifiedOrderResponse of(Order order) {
        return UnifiedOrderResponse.builder()
                .orderId(order.getOrderId())
                .orderStatus(order.getOrderStatus().name())
                .createdAt(order.getCreatedAt().toString())
                .memberName(order.getMember().getMemberName())
                .totalOrderPrice(calculateTotalOrderPrice(order))
                .isSubscription(false)
                .orderProducts(order.getOrderProducts().stream()
                        .map(OrderProductResponse::of)
                        .collect(Collectors.toList()))
                .paymentType(getPaymentType(order.getPaymentMethod()))
                .build();
    }

    public static UnifiedOrderResponse of(SubscriptionOrder subscriptionOrder) {
        return UnifiedOrderResponse.builder()
                .orderId(subscriptionOrder.getSubscriptionOrderId())
                .orderStatus(subscriptionOrder.getOrderStatus().name())
                .createdAt(subscriptionOrder.getCreatedAt().toString())
                .memberName(subscriptionOrder.getMember().getMemberName())
                .totalOrderPrice(calculateTotalSubscriptionOrderPrice(subscriptionOrder))
                .isSubscription(true)
                .subscriptionOrderProducts(subscriptionOrder.getSubscriptionOrderProducts().stream()
                        .map(SubscriptionOrderProductResponse::of)
                        .collect(Collectors.toList()))
                .paymentType(getPaymentType(subscriptionOrder.getPaymentMethod()))
                .build();
    }

    private static int calculateTotalOrderPrice(Order order) {
        return order.getOrderProducts().stream()
                .mapToInt(op -> {
                    int discountedPrice = op.getPrice() - (int) (op.getPrice() * (op.getDiscount() / 100.0));
                    return discountedPrice * op.getQuantity();
                })
                .sum();
    }

    private static int calculateTotalSubscriptionOrderPrice(SubscriptionOrder subscriptionOrder) {
        return subscriptionOrder.getSubscriptionOrderProducts().stream()
                .mapToInt(op -> {
                    int discountedPrice = op.getPrice() - (int) (op.getPrice() * (op.getDiscount() / 100.0));
                    return discountedPrice * op.getQuantity();
                })
                .sum();
    }

    private static String getPaymentType(Object paymentMethod) {
        if (paymentMethod instanceof AccountPayment) {
            return "ACCOUNT";
        } else if (paymentMethod instanceof CardPayment) {
            return "CARD";
        }
        return null;
    }
}
