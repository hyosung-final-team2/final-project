package kr.or.kosa.ubun2_be.domain.order.dto;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;

@Getter
public class SubscriptionOrderProductRequest {

    @Min(value=1,message = "가격은 양수여야 합니다.")
    private int price;

    @Min(value = 1, message = "수량은 최소 1 이상이어야 합니다.")
    private int quantity;

    @Min(value = 1, message = "productId는 최소 1 이상이어야 합니다.")
    private Long productId;

    @Min(value = 0, message = "할인율은 0 이상이어야 합니다.")
    @Max(value = 100, message = "할인율은 100 이하여야 합니다.")
    private int discount;
}
