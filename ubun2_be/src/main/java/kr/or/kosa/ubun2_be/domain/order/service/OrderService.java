package kr.or.kosa.ubun2_be.domain.order.service;

import kr.or.kosa.ubun2_be.domain.order.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
    Page<UnifiedOrderResponse> getOrders(Long customerId, SearchRequest searchRequest, Pageable pageable);

    OrderDetailResponse getOrderByCustomerIdAndOrderId(Long orderId, Long customerId);

    SubscriptionOrderDetailResponse getSubscriptionOrderByCustomerIdAndOrderId(Long orderId, Long customerId);

    Page<UnifiedOrderResponse> getPendingOrders(Long customerId, SearchRequest searchRequest, Pageable pageable);

    void updateOrderApprove(Long customerId, List<OrderApproveRequest> orderApproveRequests);
    void updateSubscriptionOrderApprove(Long customerId, List<SubscriptionApproveRequest> subscriptionApproveRequests);
}
