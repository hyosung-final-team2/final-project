package kr.or.kosa.ubun2_be.domain.order.service.impl;

import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.dto.UnifiedOrderResponse;
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

}