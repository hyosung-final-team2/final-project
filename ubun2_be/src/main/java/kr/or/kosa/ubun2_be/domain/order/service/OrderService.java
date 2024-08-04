package kr.or.kosa.ubun2_be.domain.order.service;

import kr.or.kosa.ubun2_be.domain.order.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface OrderService {
    Page<UnifiedOrderResponse> getOrders(Long customerId, SearchRequest searchRequest, Pageable pageable);

    OrderDetailResponse getOrderByCustomerIdAndOrderId(Long orderId, Long customerId);

    Page<UnifiedOrderResponse> getPendingOrders(Long customerId, SearchRequest searchRequest, Pageable pageable);

    void updateOrderStatus(Long customerId, List<OrderApproveRequest> orderApproveRequests);

    void updateSubscriptionOrderStatus(Long customerId, List<SubscriptionApproveRequest> subscriptionApproveRequests);

    void validateAndPrepareOrder(Long userId, SubscriptionOrderRequest orderRequest);

    void createSingleOrder(Long memberId, SubscriptionOrderRequest orderRequest);

    List<UnifiedOrderResponse> getAllOrdersByMemberId(OrderPeriodFilterRequest orderPeriodFilterRequest,Long memberId);

    OrderDetailResponse getOrderByMemberIdAndOrderId(Long memberId, Long orderId);

    void cancelOrder(Long memberId, CancelOrderRequest cancelOrderRequest);

    Page<UnifiedOrderResponse> getAllSingleOrdersByMemberId(OrderPeriodFilterRequest orderPeriodFilterRequest, Long memberId, Pageable pageable);

    OrderStatusSummaryResponse getOrderStatusSummaryByMemberId(Long memberId);
}
