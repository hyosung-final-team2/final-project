package kr.or.kosa.ubun2_be.domain.dashboard.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
@NoArgsConstructor
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
