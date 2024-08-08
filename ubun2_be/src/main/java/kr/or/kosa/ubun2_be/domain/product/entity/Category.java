package kr.or.kosa.ubun2_be.domain.product.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@Table(name = "category", indexes = {
        @Index(name = "idx_category_name", columnList = "categoryName")
})
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Category extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long categoryId;

    @Column(nullable = false)
    private String categoryName;

    @OneToMany(mappedBy = "category", fetch = FetchType.LAZY)
    private List<Product> products;
}
