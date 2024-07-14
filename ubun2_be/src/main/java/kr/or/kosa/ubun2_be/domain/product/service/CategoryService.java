package kr.or.kosa.ubun2_be.domain.product.service;

import kr.or.kosa.ubun2_be.domain.product.dto.CategoryResponse;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;

import java.util.List;

public interface CategoryService {
    Category findCategoryByCategoryName(String categoryName);
    List<CategoryResponse> getCategories(Long customerId, Long memberId);
}
