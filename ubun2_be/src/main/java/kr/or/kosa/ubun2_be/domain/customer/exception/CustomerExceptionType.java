package kr.or.kosa.ubun2_be.domain.customer.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum CustomerExceptionType implements CustomExceptionType {
    NOT_EXIST_CUSTOMER(-401, HttpStatus.BAD_REQUEST, "존재하지 않는 판매자입니다."),
    DUPLICATE_CUSTOMER_LOGIN_ID(-402, HttpStatus.BAD_REQUEST, "중복된 아이디가 존재합니다."),
    INVALID_REGISTER_FORMAT(-403, HttpStatus.BAD_REQUEST, "필수 입력 사항을 기입해야합니다."),
    INVALID_EXCEL_EMAIL_FORMAT(-404, HttpStatus.BAD_REQUEST, "엑셀 EMAIL 양식이 맞지않습니다."),
    INVALID_EXCEL_NAME_FORMAT(-405, HttpStatus.BAD_REQUEST, "엑셀 이름 양식이 맞지않습니다"),
    INVALID_EXCEL_PHONE_FORMAT(-406, HttpStatus.BAD_REQUEST, "엑셀 휴대폰번호 양식이 맞지않습니다"),
    DUPLICATE_CUSTOMER(-407, HttpStatus.BAD_REQUEST, "이미 존재하는 판매자입니다.");

    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMsg;

    CustomerExceptionType(int errorCode, HttpStatus httpStatus, String errorMsg) {
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
