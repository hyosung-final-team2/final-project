package kr.or.kosa.ubun2_be.domain.cart.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class CartException extends CustomException {
    private CartExceptionType cartExceptionType;

    public CartException(CartExceptionType cartExceptionType) {
        this.cartExceptionType = cartExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.cartExceptionType;
    }
}
