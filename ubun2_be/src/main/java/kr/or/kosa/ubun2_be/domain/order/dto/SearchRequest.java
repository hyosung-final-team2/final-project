package kr.or.kosa.ubun2_be.domain.order.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchRequest {
    private String searchCategory;
    private String searchKeyword;
    private String orderStatus;
}
