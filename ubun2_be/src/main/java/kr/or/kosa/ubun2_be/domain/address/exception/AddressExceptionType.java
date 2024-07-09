package kr.or.kosa.ubun2_be.domain.address.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum AddressExceptionType implements CustomExceptionType {
    NOT_EXIST_ADDRESS(-801, HttpStatus.BAD_REQUEST, "존재하지 않는 주소입니다.");

    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMsg;

    AddressExceptionType(int errorCode, HttpStatus httpStatus, String errorMsg) {
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
