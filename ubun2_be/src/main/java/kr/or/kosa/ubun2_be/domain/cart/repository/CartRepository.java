package kr.or.kosa.ubun2_be.domain.cart.repository;

import kr.or.kosa.ubun2_be.domain.cart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long>, CartRepositoryCustom {
    Optional<Cart> findByMemberIdAndCustomerId(Long memberId, Long customerId);

    List<Cart> findByMemberId(Long memberId);
}
