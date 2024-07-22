package kr.or.kosa.ubun2_be.domain.customer.dto;

import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
public class DailyOrderSummaryResponse {
    private String title;
    private long count;
    private long price;
    private String type;
    private String startTime ;
}
