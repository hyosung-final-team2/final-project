package kr.or.kosa.ubun2_be.domain.product.dto;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@NoArgsConstructor
@Setter
public class ProductDetailResponse {
    private Long productId;
    private String productName;
    private int stockQuantity;
    private int productPrice;
    private int productDiscount;
    private boolean productStatus;
    private OrderOption orderOption;
    private String productDescription;
    private String productImagePath;
    private String categoryName;
    private List<String> detailImagesPath;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private String customerAddress;


    public ProductDetailResponse(Product product, Customer customer) {
        this.productId = product.getProductId();
        this.productName = product.getProductName();
        this.productPrice = product.getProductPrice();
        this.productDiscount = product.getProductDiscount();
        this.orderOption = product.getOrderOption();
        this.stockQuantity = product.getStockQuantity();
        this.productStatus = product.isProductStatus();
        this.productDescription = product.getProductDescription();
        this.productImagePath = product.getProductImagePath();
        this.categoryName = product.getCategory().getCategoryName();
        this.detailImagesPath = product.getDetailImagesPath();
        this.customerName = customer.getCustomerName();
        this.customerEmail = customer.getCustomerEmail();
        this.customerPhone = customer.getCustomerPhone();
        this.customerAddress = customer.getBusinessAddress();
    }
}
