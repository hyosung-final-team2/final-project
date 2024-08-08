package kr.or.kosa.ubun2_be.domain.customer.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DailyOrderSummaryResponse {
    private String title;
    private long count;
    private long price;
    private String type;
    private String startTime;
}
