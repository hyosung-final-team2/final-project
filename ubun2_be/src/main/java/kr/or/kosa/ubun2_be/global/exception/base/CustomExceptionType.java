package kr.or.kosa.ubun2_be.global.exception.base;

import org.springframework.http.HttpStatus;

public interface CustomExceptionType {
    String getMessage();
    HttpStatus getHttpStatus();
    int getErrorCode();
}
