package kr.or.kosa.ubun2_be.domain.cart.dto;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartProductRequest {

    @NotNull(message = "productId는 필수값입니다.")
    @Positive
    private Long productId;

    @Min(value = 0, message = "수량은 0 이상이어야 합니다")
    private int quantity;

    @NotNull(message = "주문방법을 입력해주세요")
    private OrderOption orderOption;
}
