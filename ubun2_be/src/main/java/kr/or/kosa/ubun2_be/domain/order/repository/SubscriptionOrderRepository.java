package kr.or.kosa.ubun2_be.domain.order.repository;

import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface SubscriptionOrderRepository extends JpaRepository<SubscriptionOrder, Long>, SubscriptionOrderRepositoryCustom {

    @Query("SELECT so FROM SubscriptionOrder so " +
            "JOIN FETCH so.member m " +
            "JOIN FETCH so.paymentMethod pm " +
            "JOIN FETCH so.address a " +
            "JOIN FETCH so.subscriptionOrderProducts sop " +  // Fetch associated products
            "JOIN m.memberCustomers mc " +
            "JOIN mc.customer c " +
            "WHERE so.subscriptionOrderId = :orderId AND c.customerId = :customerId " +
            "AND sop.cycleNumber = :cycleNumber")
    Optional<SubscriptionOrder> findSubscriptionOrderByIdAndCustomerIdAndCycleNumber(@Param("orderId") Long orderId, @Param("customerId") Long customerId, @Param("cycleNumber") int cycleNumber);
}

