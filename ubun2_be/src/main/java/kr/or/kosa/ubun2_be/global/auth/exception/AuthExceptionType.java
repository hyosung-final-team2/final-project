package kr.or.kosa.ubun2_be.global.auth.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum AuthExceptionType implements CustomExceptionType {
    INVALID_LOGIN_FORMAT(100, HttpStatus.BAD_REQUEST, "올바르지 않은 데이터 형식입니다."),
    NO_EXIST_LOGIN_ID(101, HttpStatus.BAD_REQUEST, "존재하지 않는 아이디입니다."),
    NO_EXIST_LOGIN_PASSWORD(102, HttpStatus.BAD_REQUEST, "존재하지 않는 비밀번호입니다."),
    INVALID_LOGIN_ROLE(103, HttpStatus.BAD_REQUEST, "올바르지 않은 역할입니다."),
    INVALID_JWT_PAYLOAD_ROLE(104,HttpStatus.BAD_REQUEST, "올바르지 않은 JWT Payload(역할)입니다."),
    INVALID_JWT_REFRESH(105,HttpStatus.BAD_REQUEST, "올바르지 않은 refresh토큰입니다."),
    EXPIRED_JWT_ACCESS(106,HttpStatus.UNAUTHORIZED, "AccessToken이 만료되었습니다."),
    INVALID_JWT_ACCESS(107,HttpStatus.UNAUTHORIZED, "AccessToken이 아닙니다."),
    NO_EXIST_TOKEN(108,HttpStatus.UNAUTHORIZED, "AccessToken이 없습니다.."),
    BLACKLIST_TOKEN(109,HttpStatus.UNAUTHORIZED, "블랙리스트에 등록된 토큰입니다."),
    SAME_AS_OLD_PASSWORD(110,HttpStatus.BAD_REQUEST, "이전 비밀번호와 같은 비밀번호입니다."),
    NO_EXIST_EMAIL(111,HttpStatus.BAD_REQUEST, "존재하지 않는 이메일입니다."),
    NO_EXIST_AUTH_NUMBER(112,HttpStatus.BAD_REQUEST, "인증번호가 존재하지 않습니다."),
    EMAIL_SEND_FAILED(113,HttpStatus.BAD_REQUEST, "이메일 발송에 실패했습니다.");

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
