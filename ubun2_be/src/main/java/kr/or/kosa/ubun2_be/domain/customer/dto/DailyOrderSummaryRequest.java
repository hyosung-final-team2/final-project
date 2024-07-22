package kr.or.kosa.ubun2_be.domain.customer.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class DailyOrderSummaryRequest {
    private int year;
    private int month;
}
