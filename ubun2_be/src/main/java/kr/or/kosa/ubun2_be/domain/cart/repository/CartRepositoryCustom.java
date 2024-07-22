package kr.or.kosa.ubun2_be.domain.cart.repository;

import kr.or.kosa.ubun2_be.domain.cart.entity.Cart;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CartRepositoryCustom {
    Page<Cart> findCarts(Long userId, Pageable pageable);

}
