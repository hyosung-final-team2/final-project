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

    public static SubscriptionOrderProductResponse of(SubscriptionOrderProduct subscriptionOrderProduct) {
        int price = subscriptionOrderProduct.getPrice();
        int quantity = subscriptionOrderProduct.getQuantity();

        return SubscriptionOrderProductResponse.builder()
                .subscriptionOrderProductId(subscriptionOrderProduct.getSubscriptionOrderProductId())
                .quantity(subscriptionOrderProduct.getQuantity())
                .price(subscriptionOrderProduct.getPrice())
                .totalPrice(price * quantity)
                .productName(subscriptionOrderProduct.getProduct().getProductName())
                .build();
    }


}
