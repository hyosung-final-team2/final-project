package kr.or.kosa.ubun2_be.global.auth.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum AuthExceptionType implements CustomExceptionType {
    INVALID_LOGIN_FORMAT(100, HttpStatus.BAD_REQUEST, "올바르지 않은 데이터 형식입니다."),
    NO_EXIST_LOGIN_ID(101, HttpStatus.BAD_REQUEST, "존재하지 않는 아이디입니다."),
    NO_EXIST_LOGIN_PASSWORD(102, HttpStatus.BAD_REQUEST, "존재하지 않는 비밀번호입니다."),
    INVALID_LOGIN_ROLE(103, HttpStatus.BAD_REQUEST, "올바르지 않은 역할입니다.");

    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMsg;

    AuthExceptionType(int errorCode, HttpStatus httpStatus, String errorMsg) {
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
