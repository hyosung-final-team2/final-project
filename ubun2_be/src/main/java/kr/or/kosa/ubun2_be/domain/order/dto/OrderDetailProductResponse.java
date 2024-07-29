package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.entity.OrderProduct;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import lombok.Getter;

@Getter
public class OrderDetailProductResponse {
    private Long productId;
    private String productName;
    private String productDescription;
    private String productImageOriginalName;
    private String productImagePath;
    private int price;
    private int quantity;
    private double discount;
    private int totalPrice;
    private OrderProductStatus orderProductStatus;
    private Long customerId;


    public OrderDetailProductResponse(OrderProduct orderProduct) {
        Product product = orderProduct.getProduct();
        this.productId = product.getProductId();
        this.productName = product.getProductName();
        this.productDescription = product.getProductDescription();
        this.productImageOriginalName = product.getProductImageOriginalName();
        this.productImagePath = product.getProductImagePath();
        this.price = orderProduct.getPrice();
        this.quantity = orderProduct.getQuantity();
        this.discount = orderProduct.getDiscount();
        this.totalPrice = (int) (price * quantity * (100 - discount) / 100.0);
        this.orderProductStatus = orderProduct.getOrderProductStatus();
        this.customerId = product.getCustomer().getCustomerId();
    }
}
