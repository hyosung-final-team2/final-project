package kr.or.kosa.ubun2_be.domain.product.dto;

import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductResponse {
    private Long productId;
    private String productName;
    private String productCategoryName;
    private int stockQuantity;
    private int productPrice;
    private int productDiscount;
    private boolean productStatus;
    private OrderOption orderOption;
    private String productImageOriginalName;
    private String productImagePath;

    public ProductResponse(Product product) {
        this.productId = product.getProductId();
        this.productName = product.getProductName();
        this.productCategoryName = product.getCategory().getCategoryName();
        this.productPrice = product.getProductPrice();
        this.productDiscount = product.getProductDiscount();
        this.orderOption = product.getOrderOption();
        this.productStatus = product.isProductStatus();
        this.stockQuantity = product.getStockQuantity();
        this.productImageOriginalName = product.getProductImageOriginalName();
        this.productImagePath = product.getProductImagePath();
    }
}
