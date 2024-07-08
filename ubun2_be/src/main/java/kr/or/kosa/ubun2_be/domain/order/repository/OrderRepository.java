package kr.or.kosa.ubun2_be.domain.order.repository;

import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface OrderRepository extends JpaRepository<Order, Long> {

    String PENDING_STATUS = "kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus.PENDING";

    @Query(value = "SELECT DISTINCT o FROM Order o " +
            "LEFT JOIN FETCH o.member m " +
            "JOIN m.memberCustomers mc " +
            "LEFT JOIN FETCH o.orderProducts op " +
            "LEFT JOIN FETCH o.paymentMethod pm " +
            "LEFT JOIN AccountPayment ap ON pm.paymentMethodId = ap.paymentMethodId " +
            "LEFT JOIN CardPayment cp ON pm.paymentMethodId = cp.paymentMethodId " +
            "WHERE mc.customer.customerId = :customerId " +
            "AND o.orderStatus <> kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus.PENDING",
            countQuery = "SELECT COUNT(DISTINCT o) FROM Order o " +
                    "JOIN o.member m " +
                    "JOIN m.memberCustomers mc " +
                    "WHERE mc.customer.customerId = :customerId " +
                    "AND o.orderStatus <> " + PENDING_STATUS)
    Page<Order> getOrders(@Param("customerId") Long customerId, Pageable pageable);

}
