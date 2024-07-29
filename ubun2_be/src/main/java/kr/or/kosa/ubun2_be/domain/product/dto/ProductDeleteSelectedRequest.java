package kr.or.kosa.ubun2_be.domain.product.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter
public class ProductDeleteSelectedRequest {

    @NotEmpty(message = "삭제 상품 ID 목록은 비어있을 수 없습니다.")
    @Size(min = 1, message = "최소 하나 이상의 상품 ID가 필요합니다.")
    private List<@Positive(message = "상품 ID는 양수여야 합니다.") Long> productIdList;
}
