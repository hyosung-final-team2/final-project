package kr.or.kosa.ubun2_be.domain.order.dto;

import lombok.Data;

import java.util.List;

@Data
public class RemoveSubscriptionOrderProductRequest {
    private Long orderId;
    private Long customerId;
    private List<Long> subscriptionOrderProductIds;
}