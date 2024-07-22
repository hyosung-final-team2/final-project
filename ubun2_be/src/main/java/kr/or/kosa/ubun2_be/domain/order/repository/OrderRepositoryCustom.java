package kr.or.kosa.ubun2_be.domain.order.repository;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface OrderRepositoryCustom {
    List<Order> findOrdersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest);

    List<Order> findPendingOrdersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest);

    Optional<Order> findPendingOrderByIdAndCustomerId(Long orderId, Long customerId);

    List<Order> findOrdersByDateRangeAndCustomerId(LocalDateTime startDate , LocalDateTime endDate, Long customerId);

    List<Object[]> findTopSellingProductsByCustomerId(Long customerId, LocalDateTime startDate, LocalDateTime endDate);

    List<Address> findAddressesByDateRange(Long customerId, LocalDateTime startDate, LocalDateTime endDate);


}
