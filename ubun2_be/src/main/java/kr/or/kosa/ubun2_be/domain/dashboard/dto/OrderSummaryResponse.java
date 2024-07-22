package kr.or.kosa.ubun2_be.domain.dashboard.dto;

import kr.or.kosa.ubun2_be.domain.order.dto.OrderProductResponse;
import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderProductResponse;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class OrderSummaryResponse {
    private LocalDate date;
    private long orderCount;
    private long subscriptionOrderCount;
    private BigDecimal orderRevenue;
    private BigDecimal subscriptionRevenue;

    public static OrderSummaryResponse of(LocalDate date, long orderCount, long subscriptionOrderCount, BigDecimal orderRevenue, BigDecimal subscriptionRevenue) {
        return OrderSummaryResponse.builder()
                .date(date)
                .orderCount(orderCount)
                .subscriptionOrderCount(subscriptionOrderCount)
                .orderRevenue(orderRevenue)
                .subscriptionRevenue(subscriptionRevenue)
                .build();
    }
}
