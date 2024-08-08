package kr.or.kosa.ubun2_be.domain.cart.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum CartExceptionType implements CustomExceptionType {
    NOT_EXIST_MEMBER(-751, HttpStatus.BAD_REQUEST, "존재하지 않는 회원입니다."),
    NO_EXIST_PRODUCT(-752, HttpStatus.BAD_REQUEST, "존재하지 않는 제품입니다."),
    NOT_EXIST_CUSTOMER(-753, HttpStatus.BAD_REQUEST, "존재하지 않는 고객입니다."),
    NO_EXIST_CART(-754, HttpStatus.BAD_REQUEST, "존재하지 않는 장바구니입니다."),
    NO_EXIST_CART_PRODUCT(-755, HttpStatus.BAD_REQUEST, "존재하지 않는 장바구니 제품입니다."),
    ;

    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMsg;

    CartExceptionType(int errorCode, HttpStatus httpStatus, String errorMsg) {
        this.errorCode = errorCode;
        this.httpStatus = httpStatus;
        this.errorMsg = errorMsg;
    }

    @Override
    public String getMessage() {
        return this.errorMsg;
    }

    @Override
    public HttpStatus getHttpStatus() {
        return this.httpStatus;
    }

    @Override
    public int getErrorCode() {
        return this.errorCode;
    }
}
