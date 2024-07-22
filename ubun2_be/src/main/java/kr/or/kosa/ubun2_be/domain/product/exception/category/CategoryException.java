package kr.or.kosa.ubun2_be.domain.product.exception.category;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class CategoryException extends CustomException {
    private CategoryExceptionType categoryExceptionType;

    public CategoryException(CategoryExceptionType categoryExceptionType) {
        this.categoryExceptionType = categoryExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.categoryExceptionType;
    }
}
