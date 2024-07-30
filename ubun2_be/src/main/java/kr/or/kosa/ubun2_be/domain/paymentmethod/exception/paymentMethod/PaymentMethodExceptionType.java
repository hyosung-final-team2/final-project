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
    INSUFFICIENT_ACCOUNT_BALANCE(-908, HttpStatus.BAD_REQUEST, "계좌 잔액이 부족합니다."),
    NO_MATCHING_CARD_COMPANY(-909, HttpStatus.BAD_REQUEST, "일치하는 카드사가 없습니다."),
    NO_MATCHING_BANK(-910, HttpStatus.BAD_REQUEST, "일치하는 은행이 없습니다."),
    INVALID_CARD_EXPIRATION_DATE(-911, HttpStatus.BAD_REQUEST, "잘못된 카드 유효기간입니다."),
    INVALID_CVC(-912, HttpStatus.BAD_REQUEST, "잘못된 CVC 번호입니다."),
    INVALID_CARD_PASSWORD(-913, HttpStatus.BAD_REQUEST, "잘못된 카드 비밀번호입니다."),
    INVALID_ACCOUNT_PASSWORD(-914, HttpStatus.BAD_REQUEST, "잘못된 계좌 비밀번호입니다."),
    INVALID_ACCOUNT_STATUS(-915, HttpStatus.BAD_REQUEST, "계좌 상태가 유효하지 않습니다."),
    NO_MATCHING_CARD_NUMBER(-916, HttpStatus.BAD_REQUEST, "일치하는 카드번호가 없습니다."),
    NO_MATCHING_ACCOUNT_NUMBER(-917, HttpStatus.BAD_REQUEST, "일치하는 계좌번호가 없습니다.");

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