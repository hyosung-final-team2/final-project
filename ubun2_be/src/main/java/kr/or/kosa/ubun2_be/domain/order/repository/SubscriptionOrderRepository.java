package kr.or.kosa.ubun2_be.domain.order.repository;

import io.lettuce.core.dynamic.annotation.Param;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SubscriptionOrderRepository extends JpaRepository<SubscriptionOrder, Long>, SubscriptionOrderRepositoryCustom {
    @Query("SELECT so FROM SubscriptionOrder so WHERE DATE(so.nextOrderDate) = DATE(:date) AND so.orderStatus = :status")
    List<SubscriptionOrder> findByNextOrderDateAndOrderStatus(@Param("date") LocalDateTime date, @Param("status") OrderStatus status);

    List<SubscriptionOrder> findByOrderStatusOrderByNextOrderDateAsc(OrderStatus status);

    List<SubscriptionOrder> findByMemberId(Long memberId);

    Optional<SubscriptionOrder> findBySubscriptionOrderIdAndMemberMemberId(Long orderId, Long memberId);

    Optional<SubscriptionOrder> findBySubscriptionOrderIdAndMemberId(Long orderId, Long memberId);

    List<SubscriptionOrder> findByMemberIdOrderByCreatedAtDesc(Long memberId);
}
