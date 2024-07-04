package kr.or.kosa.ubun2_be.domain.customer.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum CustomerExceptionType implements CustomExceptionType {
    NOT_EXIST_CUSTOMER(-401, HttpStatus.BAD_REQUEST, "존재하지 않는 판매자입니다."),
    DUPLICATE_CUSTOMER_EMAIL(-402, HttpStatus.BAD_REQUEST, "가입된 이메일이 존재합니다.");

    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMsg;

    CustomerExceptionType(int errorCode, HttpStatus httpStatus, String errorMsg) {
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
