package kr.or.kosa.ubun2_be.domain.cart.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class CartRequest {

    @NotNull(message = "customerId는 필수값입니다.")
    @Positive
    private Long customerId;

    @NotNull(message = "memberId는 필수값입니다.")
    @Positive
    private Long memberId;

    @NotEmpty(message = "등록할 상품 ID 목록은 비어있을 수 없습니다.")
    @Size(min = 1, message = "최소 하나 이상의 cartProductID가 필요합니다.")
    private List<CartProductRequest> cartProducts;
}
