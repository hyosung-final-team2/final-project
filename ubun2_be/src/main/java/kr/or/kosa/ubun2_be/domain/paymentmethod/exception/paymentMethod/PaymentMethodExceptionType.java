package kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum PaymentMethodExceptionType implements CustomExceptionType {
    NOT_EXIST_PAYMENT_METHOD(-901,HttpStatus.BAD_REQUEST, "존재하지 않는 결제수단입니다."),
    INVALID_PAYMENT_TYPE(-902, HttpStatus.BAD_REQUEST, "잘못된 결제 유형입니다."),
    INVALID_CARD_INFO(-903, HttpStatus.BAD_REQUEST, "잘못된 카드 정보입니다."),
    INVALID_ACCOUNT_INFO(-904, HttpStatus.BAD_REQUEST, "잘못된 계좌 정보입니다."),
    INVALID_CARD_NUMBER(-905, HttpStatus.BAD_REQUEST, "잘못된 카드 번호 형식입니다."),
    INVALID_ACCOUNT_NUMBER(-906, HttpStatus.BAD_REQUEST, "잘못된 계좌 번호 형식입니다."),
    PAYMENT_NOT_MATCH(-907, HttpStatus.BAD_REQUEST, "해당 결제수단은 회원님의 결제수단이 아닙니다."),
    INSUFFICIENT_ACCOUNT_BALANCE(-908, HttpStatus.BAD_REQUEST, "계좌 잔액이 부족합니다.");

    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMsg;

    PaymentMethodExceptionType(int errorCode, HttpStatus httpStatus, String errorMsg) {
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