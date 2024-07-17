package kr.or.kosa.ubun2_be.domain.cart.repository;

import kr.or.kosa.ubun2_be.domain.cart.entity.CartProduct;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartProductRepository extends JpaRepository<CartProduct, Long> {
    void deleteByCart_Member_MemberIdAndProductProductIdIn(Long memberId, List<Long> productIds);
}
