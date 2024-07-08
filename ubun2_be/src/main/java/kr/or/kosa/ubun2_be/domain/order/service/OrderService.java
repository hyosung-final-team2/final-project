package kr.or.kosa.ubun2_be.domain.order.service;

import kr.or.kosa.ubun2_be.domain.order.dto.OrderResponse;
import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    Page<OrderResponse> getOrders(Long customerId, Pageable pageable);

    Page<SubscriptionOrderResponse> getSubscriptionOrders(Long customerId, Pageable pageable);
}
