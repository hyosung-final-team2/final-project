package kr.or.kosa.ubun2_be.domain.order.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
public class SubscriptionOrderProductRequest {

    @NotNull(message = "가격을 입력해주세요.")
    @Positive(message = "가격은 양수여야 합니다.")
    private int price;

    @NotNull(message = "수량은 필수값입니다.")
    @Min(value = 1, message = "수량은 최소 1 이상이어야 합니다.")
    private int quantity;

    @NotNull(message = "productId는 필수값입니다.")
    @Positive
    private Long productId;

    @NotNull(message = "할인율은 필수값입니다.")
    @Min(value = 0, message = "할인율은 0 이상이어야 합니다.")
    @Max(value = 100, message = "할인율은 100 이하여야 합니다.")
    private int discount;
}
