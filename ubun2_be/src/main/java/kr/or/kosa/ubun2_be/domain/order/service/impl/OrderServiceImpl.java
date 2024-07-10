package kr.or.kosa.ubun2_be.domain.order.service.impl;

import kr.or.kosa.ubun2_be.domain.order.dto.*;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.order.exception.OrderException;
import kr.or.kosa.ubun2_be.domain.order.exception.OrderExceptionType;
import kr.or.kosa.ubun2_be.domain.order.repository.OrderRepository;
import kr.or.kosa.ubun2_be.domain.order.repository.SubscriptionOrderRepository;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final SubscriptionOrderRepository subscriptionOrderRepository;

    @Override
    @Transactional(readOnly = true)
    public Page<UnifiedOrderResponse> getOrders(Long customerId, SearchRequest searchRequest, Pageable pageable) {
        List<UnifiedOrderResponse> orderResponseLists = orderRepository.findOrdersByCustomerIdAndSearchRequest(customerId, searchRequest).stream().map(UnifiedOrderResponse::new).toList();
        List<UnifiedOrderResponse> subscriptionOrderResponseList = subscriptionOrderRepository.findSubscriptionOrdersByCustomerIdAndSearchRequest(customerId, searchRequest).stream().map(UnifiedOrderResponse::new).toList();

        List<UnifiedOrderResponse> combinedList = new ArrayList<>();
        combinedList.addAll(orderResponseLists);
        combinedList.addAll(subscriptionOrderResponseList);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), combinedList.size());
        List<UnifiedOrderResponse> paginatedList = combinedList.subList(start, end);

        return new PageImpl<>(paginatedList, pageable, combinedList.size());
    }

    @Override
    public OrderDetailResponse getOrderByCustomerIdAndOrderId(Long orderId, Long customerId) {
        Order findOrder = orderRepository.findOrderByIdAndCustomerId(orderId, customerId)
                .orElseThrow(() -> new OrderException(OrderExceptionType.NOT_EXIST_ORDER));
        return new OrderDetailResponse(findOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public SubscriptionOrderDetailResponse getSubscriptionOrderByCustomerIdAndOrderIdAndCycleNumber(Long orderId, Long customerId, int cycleNumber) {
        SubscriptionOrder subscriptionOrder = subscriptionOrderRepository.findSubscriptionOrderByIdAndCustomerIdAndCycleNumber(orderId, customerId, cycleNumber)
                .orElseThrow(() -> new OrderException(OrderExceptionType.NOT_EXIST_ORDER));

        // 필터링된 제품 리스트 생성
        List<SubscriptionOrderDetailProductResponse> productResponses = subscriptionOrder.getSubscriptionOrderProducts().stream()
                .filter(product -> product.getCycleNumber() == cycleNumber)
                .map(SubscriptionOrderDetailProductResponse::new)
                .collect(Collectors.toList());

        if (productResponses.isEmpty()) {
            throw new OrderException(OrderExceptionType.NO_PRODUCTS_FOUND);
        }

        return new SubscriptionOrderDetailResponse(subscriptionOrder, productResponses);
    }
}