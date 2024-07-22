package kr.or.kosa.ubun2_be.domain.cart.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class CartProductUpdateRequest {
    private Long cartId;
    private Long customerId;
    private List<CartProductDetailRequest> cartProducts;
}
