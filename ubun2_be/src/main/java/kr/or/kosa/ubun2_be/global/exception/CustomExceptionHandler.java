package kr.or.kosa.ubun2_be.global.exception;

import kr.or.kosa.ubun2_be.domain.address.exception.address.AddressException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.product.exception.category.CategoryException;
import kr.or.kosa.ubun2_be.domain.product.exception.image.ImageException;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductException;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthException;
import kr.or.kosa.ubun2_be.global.dto.ErrorDto;
import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class CustomExceptionHandler implements ErrorController {
    @ExceptionHandler(value = GlobalException.class)
    public ResponseEntity handleGlobalException(CustomException customException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(customException.getExceptionType().getErrorCode())
                .errorMessage(customException.getExceptionType().getMessage())
                .httpStatus(customException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, customException.getExceptionType().getHttpStatus());
    }

    @ExceptionHandler(value = ImageException.class)
    public ResponseEntity handleGlobalException(ImageException imageException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(imageException.getExceptionType().getErrorCode())
                .errorMessage(imageException.getExceptionType().getMessage())
                .httpStatus(imageException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, imageException.getExceptionType().getHttpStatus());
    }

    @ExceptionHandler(value = ProductException.class)
    public ResponseEntity handleGlobalException(ProductException productException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(productException.getExceptionType().getErrorCode())
                .errorMessage(productException.getExceptionType().getMessage())
                .httpStatus(productException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, productException.getExceptionType().getHttpStatus());
    }

    @ExceptionHandler(value = CategoryException.class)
    public ResponseEntity handleGlobalException(CategoryException categoryException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(categoryException.getExceptionType().getErrorCode())
                .errorMessage(categoryException.getExceptionType().getMessage())
                .httpStatus(categoryException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, categoryException.getExceptionType().getHttpStatus());
    }

    @ExceptionHandler(value = CustomerException.class)
    public ResponseEntity handleGlobalException(CustomerException customerException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(customerException.getExceptionType().getErrorCode())
                .errorMessage(customerException.getExceptionType().getMessage())
                .httpStatus(customerException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, customerException.getExceptionType().getHttpStatus());
    }

    @ExceptionHandler(value = AuthException.class)
    public ResponseEntity handleGlobalException(AuthException authException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(authException.getExceptionType().getErrorCode())
                .errorMessage(authException.getExceptionType().getMessage())
                .httpStatus(authException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, authException.getExceptionType().getHttpStatus());
    }

    @ExceptionHandler(value = AddressException.class)
    public ResponseEntity handleGlobalException(AddressException addressException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(addressException.getExceptionType().getErrorCode())
                .errorMessage(addressException.getExceptionType().getMessage())
                .httpStatus(addressException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, addressException.getExceptionType().getHttpStatus());
    }
}
