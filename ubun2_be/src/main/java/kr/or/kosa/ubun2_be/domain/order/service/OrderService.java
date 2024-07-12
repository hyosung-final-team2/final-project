package kr.or.kosa.ubun2_be.domain.order.service;

import kr.or.kosa.ubun2_be.domain.order.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface OrderService {
    Page<UnifiedOrderResponse> getOrders(Long customerId, SearchRequest searchRequest, Pageable pageable);

    OrderDetailResponse getOrderByCustomerIdAndOrderId(Long orderId, Long customerId);

    SubscriptionOrderDetailResponse getSubscriptionOrderByCustomerIdAndOrderIdAndCycleNumber(Long orderId, Long customerId);

    Page<UnifiedOrderResponse> getPendingOrders(Long customerId, SearchRequest searchRequest, Pageable pageable);

    void updateOrderApprove(Long customerId, OrderApproveRequest orderApproveRequest);

    void updateSubscriptionOrderApprove(Long customerId, SubscriptionApproveRequest subscriptionApproveRequest);
}
