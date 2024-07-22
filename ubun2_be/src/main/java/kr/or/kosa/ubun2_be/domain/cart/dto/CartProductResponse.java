package kr.or.kosa.ubun2_be.domain.cart.dto;

import kr.or.kosa.ubun2_be.domain.cart.entity.CartProduct;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import lombok.Getter;

@Getter
public class CartProductResponse {
    private Long cartProductId;
    private Long cartId;
    private Long productId;
    private int quantity;
    private String productName;
    private String productDescription;
    private int productPrice;
    private int stockQuantity;
    private int productDiscount;
    private OrderOption orderOption;
    private String productImageOriginalName;
    private String productImagePath;

    public CartProductResponse(CartProduct cartProduct) {
        this.cartProductId = cartProduct.getCartProductId();
        this.cartId = cartProduct.getCart().getCartId();
        this.productId = cartProduct.getProduct().getProductId();
        this.quantity = cartProduct.getQuantity();
        this.productName = cartProduct.getProduct().getProductName();
        this.productDescription = cartProduct.getProduct().getProductDescription();
        this.productPrice = cartProduct.getProduct().getProductPrice();
        this.stockQuantity = cartProduct.getProduct().getStockQuantity();
        this.productDiscount = cartProduct.getProduct().getProductDiscount();
        this.orderOption = cartProduct.getProduct().getOrderOption();
        this.productImageOriginalName = cartProduct.getProduct().getProductImageOriginalName();
        this.productImagePath = cartProduct.getProduct().getProductImagePath();
    }

}