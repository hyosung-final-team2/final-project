package kr.or.kosa.ubun2_be.domain.dashboard.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubscriptionOrderProductResponse {

    private Long subscriptionOrderProductId;
    private int quantity;
    private int price;
    private int totalPrice;
    private String productName;

    public SubscriptionOrderProductResponse(SubscriptionOrderProduct subscriptionOrderProduct) {
        this.subscriptionOrderProductId = subscriptionOrderProduct.getSubscriptionOrderProductId();
        this.quantity = subscriptionOrderProduct.getQuantity();
        this.price = subscriptionOrderProduct.getPrice();
        this.totalPrice = calculateTotalPrice(subscriptionOrderProduct);
        this.productName = subscriptionOrderProduct.getProduct().getProductName();
    }

    private int calculateTotalPrice(SubscriptionOrderProduct subscriptionOrderProduct) {
        return subscriptionOrderProduct.getPrice() * subscriptionOrderProduct.getQuantity();
    }
}
