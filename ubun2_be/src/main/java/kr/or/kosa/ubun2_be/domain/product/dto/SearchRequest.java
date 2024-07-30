package kr.or.kosa.ubun2_be.domain.product.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class SearchRequest {
    private String searchCategory;
    private String searchKeyword;
}
