package kr.or.kosa.ubun2_be.domain.product.exception.product;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class ProductException extends CustomException {
    private ProductExceptionType productExceptionType;

    public ProductException(ProductExceptionType productExceptionType) {
        this.productExceptionType = productExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.productExceptionType;
    }
}
