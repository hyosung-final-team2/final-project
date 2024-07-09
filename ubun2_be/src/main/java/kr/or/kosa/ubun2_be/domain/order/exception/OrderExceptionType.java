package kr.or.kosa.ubun2_be.domain.order.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum OrderExceptionType implements CustomExceptionType {
    NOT_EXIST_ORDER(-701, HttpStatus.BAD_REQUEST, "존재하지 않는 주문입니다.");

    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMsg;

    OrderExceptionType(int errorCode, HttpStatus httpStatus, String errorMsg) {
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