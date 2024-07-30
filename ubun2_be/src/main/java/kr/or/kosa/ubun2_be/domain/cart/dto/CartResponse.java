package kr.or.kosa.ubun2_be.domain.cart.dto;

import kr.or.kosa.ubun2_be.domain.cart.entity.Cart;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class CartResponse {
    private Long customerId;
    private String businessName;
    private List<CartProductResponse> cartProducts;

    public CartResponse(Cart cart) {
        this.customerId = cart.getCustomer().getId();
        this.businessName = cart.getCustomer().getBusinessName();
        this.cartProducts = cart.getCartProducts().stream()
                .map(CartProductResponse::new)
                .collect(Collectors.toList());
    }
}