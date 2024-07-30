package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailResponse {
    private Long memberId;
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private String createdAt;
    private String addressNickname;
    private String address;
    private String paymentType;
    private String accountNumber;
    private String bankName;
    private String cardCompanyName;
    private String cardNumber;
    private String paymentMethodNickname;
    private int orderAmount;
    private int discountAmount;
    private int paymentAmount;
    private List<OrderDetailProductResponse> orderProducts;
    private OrderStatus orderStatus;

    public OrderDetailResponse(Order order) {
        this.memberId = order.getMember().getMemberId();
        this.memberName = order.getMember().getMemberName();
        this.memberEmail = order.getMember().getMemberEmail();
        this.memberPhone = order.getMember().getMemberPhone();
        this.createdAt = order.getCreatedAt().toString();
        this.addressNickname = order.getAddress().getAddressNickname();
        this.address = order.getAddress().getAddress();
        calculateOrderAmounts(order);
        this.orderProducts = order.getOrderProducts().stream()
                .map(OrderDetailProductResponse::new)
                .collect(Collectors.toList());
        this.orderStatus = order.getOrderStatus();
    }

    public OrderDetailResponse(Order order, CardPayment cardPayment) {
        this(order);
        this.paymentType = "CARD";
        this.cardCompanyName = cardPayment.getCardCompanyName();
        this.cardNumber = cardPayment.getCardNumber();
        this.paymentMethodNickname = cardPayment.getPaymentMethodNickname();
    }

    public OrderDetailResponse(Order order, AccountPayment accountPayment) {
        this(order);
        this.paymentType = "ACCOUNT";
        this.accountNumber = accountPayment.getAccountNumber();
        this.bankName = accountPayment.getBankName();
        this.paymentMethodNickname = accountPayment.getPaymentMethodNickname();
    }

    private void calculateOrderAmounts(Order order) {
        this.orderAmount = order.getOrderProducts().stream()
                .mapToInt(op -> op.getPrice() * op.getQuantity())
                .sum();
        this.discountAmount = order.getOrderProducts().stream()
                .mapToInt(op -> (int) (op.getPrice() * op.getQuantity() * op.getDiscount() / 100.0))
                .sum();
        this.paymentAmount = this.orderAmount - this.discountAmount;
    }
}