package kr.or.kosa.ubun2_be.domain.cart.service;

import kr.or.kosa.ubun2_be.domain.cart.dto.CartRequest;

import java.util.List;


public interface CartService {
    void createCarts(Long memberId, List<CartRequest> cartRequests);
}
