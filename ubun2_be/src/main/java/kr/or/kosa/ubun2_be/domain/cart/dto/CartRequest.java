package kr.or.kosa.ubun2_be.domain.cart.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class CartRequest {
    private Long customerId;
    private Long memberId;
    private List<CartProductRequest> cartProducts;
}
