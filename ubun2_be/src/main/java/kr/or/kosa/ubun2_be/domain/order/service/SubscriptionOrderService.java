package kr.or.kosa.ubun2_be.domain.order.service;//package kr.or.kosa.ubun2_be.domain.order.service.impl;

import kr.or.kosa.ubun2_be.domain.order.dto.RemoveSubscriptionOrderProductRequest;
import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderDetailResponse;
import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderRequest;

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
}
