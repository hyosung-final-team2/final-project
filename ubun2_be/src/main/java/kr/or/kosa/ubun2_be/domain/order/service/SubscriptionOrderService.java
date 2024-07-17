package kr.or.kosa.ubun2_be.domain.order.service;//package kr.or.kosa.ubun2_be.domain.order.service.impl;

import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderRequest;

import java.util.List;

public interface SubscriptionOrderService {

    void createSubscriptionOrders(Long memberId, List<SubscriptionOrderRequest> subscriptionOrderRequests);

    void validateAllCustomerProducts(List<SubscriptionOrderRequest> requests);

}
