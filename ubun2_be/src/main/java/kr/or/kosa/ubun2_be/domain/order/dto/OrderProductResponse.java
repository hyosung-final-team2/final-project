package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.OrderProduct;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderProductResponse {

    private Long orderProductId;
    private int quantity;
    private int price;
    private OrderProductStatus orderProductStatus;
    private int totalPrice;

    public OrderProductResponse(OrderProduct orderProduct) {
        this.orderProductId = orderProduct.getOrderProductId();
        this.quantity = orderProduct.getQuantity();
        this.price = orderProduct.getPrice();
        this.orderProductStatus = orderProduct.getOrderProductStatus();
        this.totalPrice = calculateTotalPrice(orderProduct);
    }

    private int calculateTotalPrice(OrderProduct orderProduct) {
        return orderProduct.getPrice() * orderProduct.getQuantity();
    }
}
