package kr.or.kosa.ubun2_be.domain.product.dto;

import lombok.Getter;

import java.util.List;
@Getter
public class DeleteSelectedProductRequest {
    private List<Long> productIdList;
}
