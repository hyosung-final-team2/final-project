package kr.or.kosa.ubun2_be.global.auth.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class AuthException extends CustomException {

    private AuthExceptionType authExceptionType;

    public AuthException(AuthExceptionType authExceptionType) {
        this.authExceptionType = authExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.authExceptionType;
    }
}
