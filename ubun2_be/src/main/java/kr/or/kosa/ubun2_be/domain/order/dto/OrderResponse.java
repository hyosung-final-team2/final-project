package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.Order;
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
public class OrderResponse {

    private Long orderId;
    private String orderStatus;
    private String createdAt;
    private String memberName;
    private String paymentType;
    private int totalOrderPrice;

    public OrderResponse(Order order) {
        this.orderId = order.getOrderId();
        this.orderStatus = order.getOrderStatus().name();
        this.createdAt = order.getCreatedAt().toString();
        this.memberName = order.getMember().getMemberName();
        this.totalOrderPrice = calculateTotalOrderPrice(order);

        if (order.getPaymentMethod() instanceof AccountPayment) {
            this.paymentType = "ACCOUNT";
        } else if (order.getPaymentMethod() instanceof CardPayment) {
            this.paymentType = "CARD";
        }
    }

    private int calculateTotalOrderPrice(Order order) {
        return order.getOrderProducts().stream()
                .mapToInt(op -> new OrderProductResponse(op).getTotalPrice())
                .sum();
    }
}
