package kr.or.kosa.ubun2_be.domain.order.repository;

import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;

import java.util.List;

public interface OrderRepositoryCustom {
    List<Order> findOrdersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest);
}