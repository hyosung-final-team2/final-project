package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class SubscriptionOrderProductResponse {
    private Long subscriptionOrderProductId;
    private int quantity;
    private int price;
    private int totalPrice;
    private String productName;
    private String productDescription;
    private String productImagePath;
    private String productImageOriginalName;
    private Long customerId;

    public static SubscriptionOrderProductResponse of(SubscriptionOrderProduct subscriptionOrderProduct) {
        Product product = subscriptionOrderProduct.getProduct();
        Customer customer = subscriptionOrderProduct.getProduct().getCustomer();
        int price = subscriptionOrderProduct.getPrice();
        int quantity = subscriptionOrderProduct.getQuantity();

        return SubscriptionOrderProductResponse.builder()
                .subscriptionOrderProductId(subscriptionOrderProduct.getSubscriptionOrderProductId())
                .quantity(quantity)
                .price(price)
                .totalPrice(price * quantity)
                .productName(product.getProductName())
                .productDescription(product.getProductDescription())
                .productImagePath(product.getProductImagePath())
                .productImageOriginalName(product.getProductImageOriginalName())
                .customerId(customer.getCustomerId())
                .build();
    }
}
