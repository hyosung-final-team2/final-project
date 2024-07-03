package kr.or.kosa.ubun2_be.domain.product.dto;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {
    private Long productId; //등록시에는 없어도 됨
    private String productName;
    private String productDescription;
    private String categoryName;
    private int stockQuantity;
    private int productPrice;
    private int productDiscount;
    private boolean productStatus;
    private OrderOption orderOption;
    private String productImageOriginalName;
    private String productImagePath;

    public Product toEntity(Customer customer, Category category) {
        return Product.builder()
                .customer(customer)
                .productName(productName)
                .productDescription(productDescription)
                .productPrice(productPrice)
                .productDiscount(productDiscount)
                .productStatus(productStatus)
                .orderOption(orderOption)
                .productImageOriginalName(productImageOriginalName)
                .productImagePath(productImagePath)
                .stockQuantity(stockQuantity)
                .category(category)
                .build();
    }
}
