package kr.or.kosa.ubun2_be.domain.product.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDeleteRequest {

    @NotNull(message = "productdId는 필수값입니다.")
    @Positive
    private Long productId;
}
