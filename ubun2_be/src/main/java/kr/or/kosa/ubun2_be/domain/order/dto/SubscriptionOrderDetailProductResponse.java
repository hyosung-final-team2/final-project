package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import lombok.Getter;

@Getter
public class SubscriptionOrderDetailProductResponse {
    private String productName;
    private String productDescription;
    private String productImageOriginalName;
    private String productImagePath;
    private int price;
    private int quantity;
    private double discount;
    private int totalPrice;
    private OrderProductStatus orderProductStatus;

    public SubscriptionOrderDetailProductResponse(SubscriptionOrderProduct subscriptionOrderProduct) {
        Product product = subscriptionOrderProduct.getProduct();
        this.productName = product.getProductName();
        this.productDescription = product.getProductDescription();
        this.productImageOriginalName = product.getProductImageOriginalName();
        this.productImagePath = product.getProductImagePath();
        this.price = subscriptionOrderProduct.getPrice();
        this.quantity = subscriptionOrderProduct.getQuantity();
        this.discount = subscriptionOrderProduct.getDiscount();
        this.totalPrice = (int) ((price - (price * discount)) * quantity);
        this.orderProductStatus = subscriptionOrderProduct.getOrderProductStatus();
    }
}