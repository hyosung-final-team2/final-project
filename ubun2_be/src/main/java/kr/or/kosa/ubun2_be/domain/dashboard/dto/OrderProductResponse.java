package kr.or.kosa.ubun2_be.domain.dashboard.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.OrderProduct;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderProductResponse {

    private Long orderProductId;
    private int quantity;
    private int price;
    private OrderProductStatus orderProductStatus;
    private int totalPrice;
    private String productName;

    public static OrderProductResponse of(OrderProduct orderProduct) {
        int price = orderProduct.getPrice();
        int quantity = orderProduct.getQuantity();

        return OrderProductResponse.builder()
                .orderProductId(orderProduct.getOrderProductId())
                .quantity(orderProduct.getQuantity())
                .price(orderProduct.getPrice())
                .orderProductStatus(orderProduct.getOrderProductStatus())
                .totalPrice(price * quantity)
                .productName(orderProduct.getProduct().getProductName())
                .build();
    }
}
