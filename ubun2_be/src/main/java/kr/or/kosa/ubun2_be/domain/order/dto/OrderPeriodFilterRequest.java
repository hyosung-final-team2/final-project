package kr.or.kosa.ubun2_be.domain.order.dto;

import kr.or.kosa.ubun2_be.domain.order.enums.PeriodType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderPeriodFilterRequest {
    private PeriodType periodType;
    private int periodValue;
}
