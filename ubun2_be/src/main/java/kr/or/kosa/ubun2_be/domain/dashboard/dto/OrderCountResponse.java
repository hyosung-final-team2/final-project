package kr.or.kosa.ubun2_be.domain.dashboard.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Builder
public class OrderCountResponse {
    private long orderCount;
    private long subscriptionOrderCount;
    private LocalDate date;

   public static OrderCountResponse of(long orderCount, long subscriptionOrderCount, LocalDate date) {
        return OrderCountResponse.builder()
                .orderCount(orderCount)
                .subscriptionOrderCount(subscriptionOrderCount)
                .date(date)
                .build();
    }
}
