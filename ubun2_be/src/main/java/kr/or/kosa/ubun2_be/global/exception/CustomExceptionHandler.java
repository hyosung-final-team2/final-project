package kr.or.kosa.ubun2_be.global.exception;

import kr.or.kosa.ubun2_be.global.dto.ErrorDto;
import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler implements ErrorController {
    @ExceptionHandler(value = GlobalException.class)
    public ResponseEntity handleGlobalException(CustomException ce) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(ce.getExceptionType().getErrorCode())
                .errorMessage(ce.getExceptionType().getMessage())
                .httpStatus(ce.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error ,ce.getExceptionType().getHttpStatus());
    }
}
