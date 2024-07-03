package kr.or.kosa.ubun2_be.domain.product.service;

import kr.or.kosa.ubun2_be.domain.product.entity.Category;

public interface CategoryService {
    Category findCategoryByCategoryName(String categoryName);
}
