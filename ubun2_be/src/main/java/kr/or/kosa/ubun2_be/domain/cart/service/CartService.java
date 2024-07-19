package kr.or.kosa.ubun2_be.domain.cart.service;

import kr.or.kosa.ubun2_be.domain.cart.dto.CartProductDeleteRequest;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartProductUpdateRequest;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartRequest;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;


public interface CartService {
    void createCarts(Long memberId, List<CartRequest> cartRequests);

    Page<CartResponse> getCarts(Long userId, Pageable pageable);

    void updateCartProductQuantities(Long userId, List<CartProductUpdateRequest> cartProductUpdateRequests);

    void deleteCartProducts(Long userId, List<CartProductDeleteRequest> cartProductDeleteRequests);
}
