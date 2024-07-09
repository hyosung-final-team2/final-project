package kr.or.kosa.ubun2_be.domain.address.exception.address;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum AddressExceptionType implements CustomExceptionType {
    NO_MATCHING_ADDRESS(-701, HttpStatus.BAD_REQUEST, "존재하는 주소가 없습니다.");

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
