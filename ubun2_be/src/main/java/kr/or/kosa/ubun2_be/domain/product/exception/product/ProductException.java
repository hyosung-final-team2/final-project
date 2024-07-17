package kr.or.kosa.ubun2_be.domain.product.exception.product;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class ProductException extends CustomException {
    private ProductExceptionType productExceptionType;
    private Object data;

    public ProductException(ProductExceptionType productExceptionType) {
        this.productExceptionType = productExceptionType;
    }
    public ProductException(ProductExceptionType productExceptionType,Object data) {
        this.productExceptionType = productExceptionType;
        this.data = data;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.productExceptionType;
    }

    public Object getData(){
        return this.data;
    }
}
