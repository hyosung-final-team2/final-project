package kr.or.kosa.ubun2_be.domain.cart.dto;

import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import lombok.Getter;

@Getter
public class CartProductRequest {
    private Long productId;
    private int quantity;
    private OrderOption orderOption;
}
