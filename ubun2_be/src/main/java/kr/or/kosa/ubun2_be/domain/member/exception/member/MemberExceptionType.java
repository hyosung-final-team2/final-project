package kr.or.kosa.ubun2_be.domain.member.exception.member;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum MemberExceptionType implements CustomExceptionType {
    NOT_EXIST_MEMBER(-501,HttpStatus.BAD_REQUEST,"존재하지 않는 회원입니다."),
    DUPLICATE_MEMBER(-502,HttpStatus.BAD_REQUEST,"이미 존재하는 회원입니다."),
    NOT_CORRECT_PAYMENT_PW(-503,HttpStatus.BAD_REQUEST,"결제 비밀번호가 일치하지 않습니다.");


    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMsg;

    MemberExceptionType(int errorCode, HttpStatus httpStatus, String errorMsg) {
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
