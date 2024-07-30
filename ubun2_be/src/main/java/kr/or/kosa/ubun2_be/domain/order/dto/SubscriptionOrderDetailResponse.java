package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class SubscriptionOrderDetailResponse {
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
    private int intervalDays;
    private int orderAmount;
    private int discountAmount;
    private int paymentAmount;
    private List<SubscriptionOrderDetailProductResponse> subscriptionOrderProducts;
    private OrderStatus orderStatus;
    private LocalDateTime nextOrderDate;
    private int latestCycleNumber;

    public SubscriptionOrderDetailResponse(SubscriptionOrder order, int latestCycleNumber) {
        this.memberName = order.getMember().getMemberName();
        this.memberEmail = order.getMember().getMemberEmail();
        this.memberPhone = order.getMember().getMemberPhone();
        this.createdAt = order.getCreatedAt().toString();
        this.addressNickname = order.getAddress().getAddressNickname();
        this.address = order.getAddress().getAddress();
        this.intervalDays = order.getIntervalDays();
        this.orderStatus = order.getOrderStatus();
        this.subscriptionOrderProducts = order.getSubscriptionOrderProducts().stream()
                .map(SubscriptionOrderDetailProductResponse::new)
                .collect(Collectors.toList());
        this.orderStatus = order.getOrderStatus();
        this.nextOrderDate = order.getNextOrderDate();
        this.latestCycleNumber = latestCycleNumber;
        calculateOrderAmounts(order);
    }

    public SubscriptionOrderDetailResponse(SubscriptionOrder order, CardPayment cardPayment, int latestCycleNumber) {
        this(order, latestCycleNumber);
        this.paymentType = "CARD";
        this.cardCompanyName = cardPayment.getCardCompanyName();
        this.cardNumber = cardPayment.getCardNumber();
        this.paymentMethodNickname = cardPayment.getPaymentMethodNickname();
    }

    public SubscriptionOrderDetailResponse(SubscriptionOrder order, AccountPayment accountPayment, int latestCycleNumber) {
        this(order, latestCycleNumber);
        this.paymentType = "ACCOUNT";
        this.accountNumber = accountPayment.getAccountNumber();
        this.bankName = accountPayment.getBankName();
        this.paymentMethodNickname = accountPayment.getPaymentMethodNickname();
    }
    private void calculateOrderAmounts(SubscriptionOrder order) {
        this.orderAmount = subscriptionOrderProducts.stream()
                .mapToInt(op -> op.getPrice() * op.getQuantity())
                .sum();
        this.discountAmount = subscriptionOrderProducts.stream()
                .mapToInt(op -> (int) (op.getPrice() * op.getQuantity() * op.getDiscount() / 100.0))
                .sum();
        this.paymentAmount = this.orderAmount - this.discountAmount;
    }
}