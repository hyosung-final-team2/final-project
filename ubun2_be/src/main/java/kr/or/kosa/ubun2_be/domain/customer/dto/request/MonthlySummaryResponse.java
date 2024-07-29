package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MonthlySummaryResponse {

    private MonthStatistics currentMonth;
    private MonthStatistics previousMonth;


    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MonthStatistics {
        // 단건 주문 건수
        private long monthOrderCount;

        // 정기 주문 건수
        private long monthSubscriptionOrderCount;

        // 총 주문 건수
        private long monthTotalOrderCount;

        // 단건 주문 총 매출
        private long monthOrderTotalSales;

        // 정기 주문 총 매출
        private long monthSubscriptionOrderTotalSales;

        // 총 매출
        private long monthTotalSales;

        // 일 평균 매출액(총매출액/일)
        private long monthAverageDailySales;

        // 일 평균 주문건수(총 주문건수/일)
        private long monthAverageDailyOrderCount;
    }
}
