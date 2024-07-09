package kr.or.kosa.ubun2_be.domain.order.repository;

import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;

import java.util.List;


public interface SubscriptionOrderRepositoryCustom {
    List<SubscriptionOrder> findSubscriptionOrdersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest);
}
