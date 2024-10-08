package kr.or.kosa.ubun2_be.domain.order.repository;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface SubscriptionOrderRepositoryCustom {
    List<SubscriptionOrder> findSubscriptionOrdersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest);

    List<SubscriptionOrder> findPendingSubscriptionOrdersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest);

    Optional<SubscriptionOrder> findPendingSubscriptionOrderByIdAndCustomerId(Long subscriptionOrderId, Long customerId);

    Optional<SubscriptionOrder> findSubscriptionOrderByIdAndCustomerId(Long orderId, Long customerId);

    Optional<Integer> findLatestCycleNumberByCustomerIdAndOrderId(Long customerId, Long orderId);

    List<SubscriptionOrder> findSubscriptionOrderByDateRangeAndCustomerId(LocalDateTime startDate, LocalDateTime endDate, Long customerId);

    List<SubscriptionOrder> findAllSubscriptionOrderByDateRangeAndCustomerId(LocalDateTime startDate, LocalDateTime endDate, Long customerId);

    List<Object[]> findTopSellingProductsByCustomerId(Long customerId, LocalDateTime startDate, LocalDateTime endDate);

    List<Address> findAddressesByDateRange(Long customerId, LocalDateTime startDate, LocalDateTime endDate);

    Long countSubscriptionOrdersByCustomerAndDateRange(LocalDateTime startDate, LocalDateTime endDate, Long customerId);

    Long sumSubscriptionOrderTotalByCustomerAndDateRange(LocalDateTime startDate, LocalDateTime endDate, Long customerId);

    Page<SubscriptionOrder> findSubscriptionOrdersByMemberId(Long memberId, LocalDateTime startDate, LocalDateTime endDate, Pageable pageable);
}

