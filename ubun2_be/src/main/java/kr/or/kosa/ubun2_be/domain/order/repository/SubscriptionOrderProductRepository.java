package kr.or.kosa.ubun2_be.domain.order.repository;

import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionOrderProductRepository extends JpaRepository<SubscriptionOrderProduct, Long> {
}
