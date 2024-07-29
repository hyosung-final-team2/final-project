package kr.or.kosa.ubun2_be.domain.product.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CategoryRequest {

    @NotBlank(message = "카테고리명을 입력해주세요")
    private String categoryName;
}
