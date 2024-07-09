package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionOrderResponse {

    private Long subscriptionOrderId;
    private String orderStatus;
    private String createdAt;
    private String memberName;
    private String paymentType;
    private int totalSubscriptionOrderPrice;

    public SubscriptionOrderResponse(SubscriptionOrder subscriptionOrder) {
        this.subscriptionOrderId = subscriptionOrder.getSubscriptionOrderId();
        this.orderStatus = subscriptionOrder.getOrderStatus().name();
        this.createdAt = subscriptionOrder.getCreatedAt().toString();
        this.memberName = subscriptionOrder.getMember().getMemberName();
        this.totalSubscriptionOrderPrice = calculateTotalSubscriptionOrderPrice(subscriptionOrder);

        if (subscriptionOrder.getPaymentMethod() instanceof AccountPayment) {
            this.paymentType = "ACCOUNT";
        } else if (subscriptionOrder.getPaymentMethod() instanceof CardPayment) {
            this.paymentType = "CARD";
        }
    }

    private int calculateTotalSubscriptionOrderPrice(SubscriptionOrder subscriptionOrder) {
        return subscriptionOrder.getSubscriptionOrderProducts().stream()
                .mapToInt(op -> new SubscriptionOrderProductResponse(op).getTotalPrice())
                .sum();
    }

}
