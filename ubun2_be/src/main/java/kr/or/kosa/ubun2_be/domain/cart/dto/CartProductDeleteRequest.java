package kr.or.kosa.ubun2_be.domain.cart.dto;

import lombok.Getter;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class CartProductDeleteRequest {
    private Long cartId;
    private Long customerId;
    private List<CartProductDetailRequest> cartProducts;

    public List<Long> getProductIds() {
        return cartProducts.stream()
                .map(CartProductDetailRequest::getProductId)
                .collect(Collectors.toList());
    }
}