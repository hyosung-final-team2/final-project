package kr.or.kosa.ubun2_be.domain.dashboard.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TopSellingProductDto {
    private Long productId;
    private String productName;
    private Long salesCount;

    public static TopSellingProductDto of(Long productId, String productName, Long salesCount) {
        return new TopSellingProductDto(productId, productName, salesCount);
    }
}
