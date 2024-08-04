package kr.or.kosa.ubun2_be.domain.order.service;//package kr.or.kosa.ubun2_be.domain.order.service.impl;

import kr.or.kosa.ubun2_be.domain.order.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface SubscriptionOrderService {

    void createSubscriptionOrders(Long memberId, List<SubscriptionOrderRequest> subscriptionOrderRequests);

    void validateAllCustomerProducts(List<SubscriptionOrderRequest> requests);

    void processApprovedSubscriptionOrders();

    void processDelaySubscriptionOrders();

    SubscriptionOrderDetailResponse getSubscriptionOrderByCustomerIdAndOrderId(Long orderId, Long customerId);

    SubscriptionOrderDetailResponse getSubscriptionOrderByMemberIdAndOrderId(Long memberId, Long orderId);

    void removeSubscriptionOrderProducts(Long memberId, RemoveSubscriptionOrderProductRequest request);

    void validateAndPrepareSubscriptionOrder(Long memberId, List<SubscriptionOrderRequest> orderRequest);

    Page<UnifiedOrderResponse> getAllSubscriptionOrdersByMemberId(OrderPeriodFilterRequest orderPeriodFilterRequest, Long memberId, Pageable pageable);
}
