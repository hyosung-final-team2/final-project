package kr.or.kosa.ubun2_be.domain.cart.dto;

import lombok.Getter;

@Getter
public class CartProductDetailRequest {
    private Long cartProductId;
    private int quantity;
}
