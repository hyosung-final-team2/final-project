package kr.or.kosa.ubun2_be.domain.product.dto;

import jakarta.validation.constraints.*;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {

    @Positive
    private Long productId; //등록시에는 없어도 됨

    @NotBlank(message = "상품명을 입력해주세요")
    private String productName;

    private String productDescription;

    @NotBlank(message = "카테고리명을 입력해주세요")
    private String categoryName;

    @Min(value = 0, message = "재고 수량은 0 이상이어야 합니다")
    private int stockQuantity;

    @Positive(message = "상품 가격은 양수여야 합니다.")
    private int productPrice;

    @Min(value = 0, message = "할인율은 0 이상이어야 합니다.")
    @Max(value = 100, message = "할인율은 100 이하여야 합니다.")
    private int productDiscount;

    @NotNull(message = "상품 게시상태를 입력해주세요")
    private boolean productStatus;

    @NotNull(message = "주문방법을 입력해주세요")
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
