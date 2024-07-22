package kr.or.kosa.ubun2_be.domain.order.repository;

import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderRepository extends JpaRepository<Order, Long>, OrderRepositoryCustom {

    @Query("SELECT o FROM Order o " +
            "JOIN FETCH o.member m " +
            "JOIN FETCH o.paymentMethod pm " +
            "JOIN FETCH o.address a " +
            "JOIN m.memberCustomers mc " +
            "JOIN mc.customer c " +
            "WHERE o.orderId = :orderId AND c.customerId = :customerId")
    Optional<Order> findOrderByIdAndCustomerId(@Param("orderId") Long orderId, @Param("customerId") Long customerId);

    List<Order> findByMemberId(Long memberId);

    Optional<Order> findByOrderIdAndMemberMemberId(Long orderId, Long memberId);

    Optional<Order> findByOrderIdAndMemberMemberIdAndOrderStatus(Long orderId, Long memberId, OrderStatus orderStatus);
}