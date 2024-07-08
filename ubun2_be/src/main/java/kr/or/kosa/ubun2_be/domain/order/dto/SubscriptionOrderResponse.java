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
    private String updatedAt;
    private String memberName;
    private Long customerId;
    private List<SubscriptionOrderProductResponse> subscriptionOrderProducts;
    private Long paymentMethodId;
    private String paymentType;
    private int totalSubscriptionOrderPrice;

    public SubscriptionOrderResponse(SubscriptionOrder subscriptionOrder) {
        this.subscriptionOrderId = subscriptionOrder.getSubscriptionOrderId();
        this.orderStatus = subscriptionOrder.getOrderStatus().name();
        this.createdAt = subscriptionOrder.getCreatedAt().toString();
        this.updatedAt = subscriptionOrder.getUpdatedAt().toString();
        this.memberName = subscriptionOrder.getMember().getMemberName();
        this.customerId = subscriptionOrder.getMember().getMemberCustomers().get(0).getCustomer().getCustomerId();
        this.subscriptionOrderProducts = subscriptionOrder.getSubscriptionOrderProducts().stream()
                .map(SubscriptionOrderProductResponse::new)
                .collect(Collectors.toList());
        this.paymentMethodId = subscriptionOrder.getPaymentMethod().getPaymentMethodId();
        this.totalSubscriptionOrderPrice = calculateTotalSubscriptionOrderPrice();

        if (subscriptionOrder.getPaymentMethod() instanceof AccountPayment) {
            this.paymentType = "ACCOUNT";
        } else if (subscriptionOrder.getPaymentMethod() instanceof CardPayment) {
            this.paymentType = "CARD";
        }
    }

    private int calculateTotalSubscriptionOrderPrice() {
        return this.subscriptionOrderProducts.stream()
                .mapToInt(SubscriptionOrderProductResponse::getTotalPrice)
                .sum();
    }

}
