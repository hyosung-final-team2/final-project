package kr.or.kosa.ubun2_be.global.exception;

import kr.or.kosa.ubun2_be.domain.address.exception.AddressException;
import kr.or.kosa.ubun2_be.domain.cart.exception.CartException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.pendingmember.PendingMemberException;
import kr.or.kosa.ubun2_be.domain.order.exception.OrderException;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodException;
import kr.or.kosa.ubun2_be.domain.product.exception.category.CategoryException;
import kr.or.kosa.ubun2_be.domain.product.exception.image.ImageException;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductException;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthException;
import kr.or.kosa.ubun2_be.global.dto.ErrorDto;
import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

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
                .data(productException.getData())
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


    @ExceptionHandler(value = PaymentMethodException.class)
    public ResponseEntity handleGlobalException(PaymentMethodException paymentMethodException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(paymentMethodException.getExceptionType().getErrorCode())
                .errorMessage(paymentMethodException.getExceptionType().getMessage())
                .httpStatus(paymentMethodException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, paymentMethodException.getExceptionType().getHttpStatus());
    }


    @ExceptionHandler(value = OrderException.class)
    public ResponseEntity handleGlobalException(OrderException orderException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(orderException.getExceptionType().getErrorCode())
                .errorMessage(orderException.getExceptionType().getMessage())
                .httpStatus(orderException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, orderException.getExceptionType().getHttpStatus());
    }

    @ExceptionHandler(value = CartException.class)
    public ResponseEntity handleGlobalException(CartException cartException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(cartException.getExceptionType().getErrorCode())
                .errorMessage(cartException.getExceptionType().getMessage())
                .httpStatus(cartException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, cartException.getExceptionType().getHttpStatus());
    }
    @ExceptionHandler(value = MemberException.class)
    public ResponseEntity handleGlobalException(MemberException memberException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(memberException.getExceptionType().getErrorCode())
                .errorMessage(memberException.getExceptionType().getMessage())
                .httpStatus(memberException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, memberException.getExceptionType().getHttpStatus());
    }

    @ExceptionHandler(value = PendingMemberException.class)
    public ResponseEntity handleGlobalException(PendingMemberException pendingMemberException) {
        ErrorDto error = ErrorDto.builder()
                .errorCode(pendingMemberException.getExceptionType().getErrorCode())
                .errorMessage(pendingMemberException.getExceptionType().getMessage())
                .httpStatus(pendingMemberException.getExceptionType().getHttpStatus())
                .build();

        return new ResponseEntity(error, pendingMemberException.getExceptionType().getHttpStatus());
    }
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorDto> handleMethodArgumentNotValid(MethodArgumentNotValidException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getFieldErrors().forEach(error ->
                errors.put(error.getField(), error.getDefaultMessage())
        );

        ErrorDto errorDto = ErrorDto.builder()
                .errorCode(HttpStatus.BAD_REQUEST.value())
                .errorMessage("입력값 검증 실패")
                .httpStatus(HttpStatus.BAD_REQUEST)
                .data(errors)
                .build();

        return new ResponseEntity<>(errorDto, HttpStatus.BAD_REQUEST);
    }

}
