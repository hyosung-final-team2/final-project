package kr.or.kosa.ubun2_be.domain.cart.dto;

import kr.or.kosa.ubun2_be.domain.cart.entity.Cart;
import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CartResponse {
    private Long customerId;
    private List<CartProductResponse> cartProducts;

    public CartResponse(Cart cart) {
        this.customerId = cart.getCustomer().getId();
        this.cartProducts = cart.getCartProducts().stream()
                .map(CartProductResponse::new)
                .collect(Collectors.toList());
    }
}