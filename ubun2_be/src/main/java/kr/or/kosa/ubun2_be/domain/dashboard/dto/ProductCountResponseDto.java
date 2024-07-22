package kr.or.kosa.ubun2_be.domain.dashboard.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class ProductCountResponseDto {
    private Long totalCount;
    private Long activeCount;
    private Long inactiveCount;

    public static ProductCountResponseDto of(Long totalCount, Long activeCount, Long inactiveCount) {
        return new ProductCountResponseDto(totalCount, activeCount, inactiveCount);
    }
}
