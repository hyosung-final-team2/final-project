package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.order.entity.OrderProduct;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import lombok.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class OrderProductResponse {
    private Long orderProductId;
    private int quantity;
    private int price;
    private OrderProductStatus orderProductStatus;
    private int totalPrice;
    private String productName;
    private String productDescription;
    private String productImagePath;
    private String productImageOriginalName;
    private Long customerId;

    public static OrderProductResponse of(OrderProduct orderProduct) {
        Product product = orderProduct.getProduct();
        Customer customer = orderProduct.getProduct().getCustomer();
        int price = orderProduct.getPrice();
        int quantity = orderProduct.getQuantity();

        return OrderProductResponse.builder()
                .orderProductId(orderProduct.getOrderProductId())
                .quantity(quantity)
                .price(price)
                .orderProductStatus(orderProduct.getOrderProductStatus())
                .totalPrice(price * quantity)
                .productName(product.getProductName())
                .productDescription(product.getProductDescription())
                .productImagePath(product.getProductImagePath())
                .productImageOriginalName(product.getProductImageOriginalName())
                .customerId(customer.getCustomerId())
                .build();
    }
}
