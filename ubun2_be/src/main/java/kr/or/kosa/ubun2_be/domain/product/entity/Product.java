package kr.or.kosa.ubun2_be.domain.product.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.cart.entity.CartProduct;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.order.entity.OrderProduct;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductRequest;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;

import java.util.List;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Table(name = "product")
@SQLDelete(sql = "UPDATE product SET is_deleted = true WHERE product_id=?")
public class Product extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String productName;

    @Column(nullable = false)
    private String productDescription;

    @Column(nullable = false)
    private int productPrice;

    @Column(nullable = false) // 재고수량 추가
    private int stockQuantity;

    @Column
    private int productDiscount;

    @Column(nullable = false)
    private boolean productStatus;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private OrderOption orderOption;

    @Column
    private String productImageOriginalName;

    @Column
    private String productImagePath;

    @Column
    @ColumnDefault("false")
    private boolean isDeleted;

    @OneToMany(mappedBy = "product")
    private List<OrderProduct> orderProducts;

    @OneToMany(mappedBy = "product")
    private List<SubscriptionOrderProduct> subscriptionOrderProducts;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    private List<CartProduct> cartProducts;

    public void updateProduct(ProductRequest productRequest) {
        this.productName = productRequest.getProductName();
        this.productDescription = productRequest.getProductDescription();
        this.productPrice = productRequest.getProductPrice();
        this.productDiscount = productRequest.getProductDiscount();
        this.productStatus = productRequest.isProductStatus();
        this.orderOption = productRequest.getOrderOption();
        this.productImageOriginalName = productRequest.getProductImageOriginalName();
        this.productImagePath = productRequest.getProductImagePath();
        this.stockQuantity = productRequest.getStockQuantity();
    }

    public void saveImage(String productImageOriginalName, String productImagePath) {
        this.productImageOriginalName = productImageOriginalName;
        this.productImagePath = productImagePath;
    }

    public void updateStockQuantity(int stockQuantity) {
        this.stockQuantity = stockQuantity;
    }


}