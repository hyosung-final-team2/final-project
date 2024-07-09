package kr.or.kosa.ubun2_be.domain.order.repository;

import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SubscriptionOrderRepository extends JpaRepository<Order, Long>, SubscriptionOrderRepositoryCustom {

}