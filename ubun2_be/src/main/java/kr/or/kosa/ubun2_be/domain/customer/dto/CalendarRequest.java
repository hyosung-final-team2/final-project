package kr.or.kosa.ubun2_be.domain.customer.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CalendarRequest {

    @Min(value = 1900, message = "연도는 1900년 이상이어야 합니다.")
    @Max(value = 2030, message = "연도는 현재 연도를 초과할 수 없습니다.")
    private int year;

    @Min(value = 1, message = "월은 1 이상이어야 합니다.")
    @Max(value = 12, message = "월은 12 이하여야 합니다.")
    private int month;
}
