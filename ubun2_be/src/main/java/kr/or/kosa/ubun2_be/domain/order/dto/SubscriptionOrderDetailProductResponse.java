package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import lombok.Getter;

@Getter
public class SubscriptionOrderDetailProductResponse {
    private Long subscriptionOrderProductId;
    private String createdAt;
    private Long productId;
    private String productName;
    private String productDescription;
    private String productImageOriginalName;
    private String productImagePath;
    private int cycleNumber;
    private int price;
    private int quantity;
    private double discount;
    private int totalPrice;
    private OrderProductStatus orderProductStatus;
    private Long customerId;

    public SubscriptionOrderDetailProductResponse(SubscriptionOrderProduct subscriptionOrderProduct) {
        Product product = subscriptionOrderProduct.getProduct();
        this.subscriptionOrderProductId = subscriptionOrderProduct.getSubscriptionOrderProductId();
        this.createdAt = subscriptionOrderProduct.getCreatedAt().toString();
        this.productId = product.getProductId();
        this.productName = product.getProductName();
        this.productDescription = product.getProductDescription();
        this.productImageOriginalName = product.getProductImageOriginalName();
        this.productImagePath = product.getProductImagePath();
        this.cycleNumber = subscriptionOrderProduct.getCycleNumber();
        this.price = subscriptionOrderProduct.getPrice();
        this.quantity = subscriptionOrderProduct.getQuantity();
        this.discount = subscriptionOrderProduct.getDiscount();
        this.totalPrice = (int) (price * quantity * (100 - discount) / 100.0);
        this.orderProductStatus = subscriptionOrderProduct.getOrderProductStatus();
        this.customerId = product.getCustomer().getCustomerId();
    }
}