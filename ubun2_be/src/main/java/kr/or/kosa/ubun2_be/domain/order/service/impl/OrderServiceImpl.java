package kr.or.kosa.ubun2_be.domain.order.service.impl;

import kr.or.kosa.ubun2_be.domain.order.dto.*;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.OrderProduct;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import kr.or.kosa.ubun2_be.domain.order.exception.OrderException;
import kr.or.kosa.ubun2_be.domain.order.exception.OrderExceptionType;
import kr.or.kosa.ubun2_be.domain.order.repository.OrderRepository;
import kr.or.kosa.ubun2_be.domain.order.repository.SubscriptionOrderRepository;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

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
    public SubscriptionOrderDetailResponse getSubscriptionOrderByCustomerIdAndOrderIdAndCycleNumber(Long orderId, Long customerId) {
        SubscriptionOrder subscriptionOrder = subscriptionOrderRepository.findSubscriptionOrderByIdAndCustomerIdAndCycleNumber(orderId, customerId)
                .orElseThrow(() -> new OrderException(OrderExceptionType.NOT_EXIST_ORDER));

        int latestCycleNumber = findLatestCycleNumber(customerId, orderId);
        return new SubscriptionOrderDetailResponse(subscriptionOrder, latestCycleNumber);
    }

    private int findLatestCycleNumber(Long customerId, Long orderId) {
        return subscriptionOrderRepository.findLatestCycleNumberByCustomerIdAndOrderId(customerId, orderId)
                .orElseThrow(() -> new OrderException(OrderExceptionType.NOT_EXIST_ORDER));
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UnifiedOrderResponse> getPendingOrders(Long customerId, SearchRequest searchRequest, Pageable pageable) {
        List<UnifiedOrderResponse> orderResponseLists = orderRepository.findPendingOrdersByCustomerIdAndSearchRequest(customerId, searchRequest).stream().map(UnifiedOrderResponse::new).toList();
        List<UnifiedOrderResponse> subscriptionOrderResponseList = subscriptionOrderRepository.findPendingSubscriptionOrdersByCustomerIdAndSearchRequest(customerId, searchRequest).stream().map(UnifiedOrderResponse::new).toList();

        List<UnifiedOrderResponse> combinedList = new ArrayList<>();
        combinedList.addAll(orderResponseLists);
        combinedList.addAll(subscriptionOrderResponseList);

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), combinedList.size());
        List<UnifiedOrderResponse> paginatedList = combinedList.subList(start, end);

        return new PageImpl<>(paginatedList, pageable, combinedList.size());
    }

    @Override
    @Transactional
    public void updateOrderApprove(Long customerId, OrderApproveRequest orderApproveRequest) {
        Order findPendingOrder = orderRepository.findPendingOrderByIdAndCustomerId(orderApproveRequest.getOrderId(), customerId)
                .orElseThrow(() -> new OrderException(OrderExceptionType.NOT_EXIST_ORDER));

        // OrderStatus 검증 및 업데이트
        OrderStatus newStatus = validateAndGetOrderStatus(orderApproveRequest.getOrderStatus());
        findPendingOrder.changeOrderStatus(newStatus);
        for (OrderProduct orderProduct : findPendingOrder.getOrderProducts()) {
            if (newStatus.equals(OrderStatus.APPROVED)) {
                orderProduct.changeOrderProductStatus(OrderProductStatus.APPROVED);
            } else {
                orderProduct.changeOrderProductStatus(OrderProductStatus.DENIED);
            }
        }
        orderRepository.save(findPendingOrder);
    }

    @Override
    @Transactional
    public void updateSubscriptionOrderApprove(Long customerId, SubscriptionApproveRequest subscriptionApproveRequest) {
        SubscriptionOrder findSubscriptionPendingOrder = subscriptionOrderRepository.findPendingSubscriptionOrderByIdAndCustomerId(subscriptionApproveRequest.getSubscriptionOrderId(), customerId)
                .orElseThrow(() -> new OrderException(OrderExceptionType.NOT_EXIST_ORDER));

        // OrderStatus 검증 및 업데이트
        OrderStatus newOrderStatus = validateAndGetOrderStatus(subscriptionApproveRequest.getOrderStatus());
        findSubscriptionPendingOrder.changeOrderStatus(newOrderStatus);
        for (SubscriptionOrderProduct subscriptionOrderProduct : findSubscriptionPendingOrder.getSubscriptionOrderProducts()) {
            if (newOrderStatus.equals(OrderStatus.APPROVED)) {
                subscriptionOrderProduct.changeSubscriptionOrderProductStatus(OrderProductStatus.APPROVED);
            } else {
                subscriptionOrderProduct.changeSubscriptionOrderProductStatus(OrderProductStatus.DENIED);
            }
        }
        subscriptionOrderRepository.save(findSubscriptionPendingOrder);
    }

    private OrderStatus validateAndGetOrderStatus(String orderStatus) {
        try {
            return OrderStatus.valueOf(orderStatus.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new OrderException(OrderExceptionType.INVALID_ORDER_STATUS);
        }
    }

}