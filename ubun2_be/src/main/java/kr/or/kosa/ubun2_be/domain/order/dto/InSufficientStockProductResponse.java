package kr.or.kosa.ubun2_be.domain.order.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class InSufficientStockProductResponse {
    private Long productId;
    private String productName;
}
