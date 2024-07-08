package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SubscriptionOrderProductResponse {

    private Long subscriptionOrderProductId;
    private int quantity;
    private int price;
    private int totalPrice;

    public SubscriptionOrderProductResponse(SubscriptionOrderProduct subscriptionOrderProduct) {
        this.subscriptionOrderProductId = subscriptionOrderProduct.getSubscriptionOrderProductId();
        this.quantity = subscriptionOrderProduct.getQuantity();
        this.price = subscriptionOrderProduct.getPrice();
        this.totalPrice = calculateTotalPrice(subscriptionOrderProduct);
    }

    private int calculateTotalPrice(SubscriptionOrderProduct subscriptionOrderProduct) {
        return subscriptionOrderProduct.getPrice() * subscriptionOrderProduct.getQuantity();
    }
}
