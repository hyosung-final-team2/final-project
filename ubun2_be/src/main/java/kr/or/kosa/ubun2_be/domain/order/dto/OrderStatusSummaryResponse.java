package kr.or.kosa.ubun2_be.domain.order.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class OrderStatusSummaryResponse {
    private int pending;
    private int denied;
    private int approved;
    private int singleOrders;
    private int subscriptionOrders;
}
