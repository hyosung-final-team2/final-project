package kr.or.kosa.ubun2_be.domain.product.dto;

import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDetailResponse {
    private Long productId;
    private String productName;
    private int stockQuantity;
    private int productPrice;
    private int productDiscount;
    private boolean productStatus;
    private OrderOption orderOption;

    public ProductDetailResponse(Product product) {
        this.productId = product.getProductId();
        this.productName = product.getProductName();
        this.productPrice = product.getProductPrice();
        this.productDiscount = product.getProductDiscount();
        this.orderOption = product.getOrderOption();
        this.stockQuantity = product.getStockQuantity();
        this.productStatus = product.isProductStatus();
    }

}
