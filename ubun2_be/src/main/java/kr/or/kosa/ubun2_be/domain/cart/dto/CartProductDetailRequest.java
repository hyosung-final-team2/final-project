package kr.or.kosa.ubun2_be.domain.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
public class CartProductDetailRequest {

    @NotNull(message = "cartProductId는 필수값입니다.")
    @Positive
    private Long cartProductId;

    @Min(value = 0, message = "수량은 0 이상이어야 합니다")
    private int quantity;
}
