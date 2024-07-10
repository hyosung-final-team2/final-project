package kr.or.kosa.ubun2_be.domain.order.repository;

import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface SubscriptionOrderRepository extends JpaRepository<SubscriptionOrder, Long>, SubscriptionOrderRepositoryCustom {

    @Query("SELECT so FROM SubscriptionOrder so " +
            "JOIN FETCH so.member m " +
            "JOIN FETCH so.paymentMethod pm " +
            "JOIN FETCH so.address a " +
            "JOIN m.memberCustomers mc " +
            "JOIN mc.customer c " +
            "WHERE so.subscriptionOrderId = :orderId AND c.customerId = :customerId " +
            "AND EXISTS (SELECT sop FROM SubscriptionOrderProduct sop WHERE sop.subscriptionOrder.subscriptionOrderId = so.subscriptionOrderId AND sop.cycleNumber = :cycleNumber)")
    Optional<SubscriptionOrder> findSubscriptionOrderByIdAndCustomerIdAndCycleNumber(@Param("orderId") Long orderId, @Param("customerId") Long customerId, @Param("cycleNumber") int cycleNumber);

    @Query("SELECT sop FROM SubscriptionOrderProduct sop " +
            "JOIN sop.subscriptionOrder so " +
            "JOIN so.member m " +
            "JOIN so.paymentMethod pm " +
            "JOIN so.address a " +
            "JOIN m.memberCustomers mc " +
            "JOIN mc.customer c " +
            "WHERE so.subscriptionOrderId = :orderId " +
            "AND c.customerId = :customerId " +
            "AND sop.cycleNumber = :cycleNumber")
    List<SubscriptionOrderProduct> findSubscriptionOrderProductsByOrderIdAndCustomerIdAndCycleNumber(@Param("orderId") Long orderId,
                                                                                                     @Param("customerId") Long customerId,
                                                                                                     @Param("cycleNumber") int cycleNumber);
}
