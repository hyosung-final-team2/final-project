package kr.or.kosa.ubun2_be.domain.order.service;

import kr.or.kosa.ubun2_be.domain.order.dto.OrderDetailResponse;
import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.dto.UnifiedOrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    Page<UnifiedOrderResponse> getOrders(Long customerId, SearchRequest searchRequest, Pageable pageable);

    OrderDetailResponse getOrderByCustomerIdAndOrderId(Long orderId, Long customerId);
}
