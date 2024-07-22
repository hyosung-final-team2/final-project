package kr.or.kosa.ubun2_be.domain.product.exception.product;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum ProductExceptionType implements CustomExceptionType {
    NOT_EXIST_PRODUCT(-201, HttpStatus.BAD_REQUEST, "존재하는 상품이 없습니다."),
    DUPLICATE_PRODUCT_NAME(-202, HttpStatus.BAD_REQUEST, "같은 이름의 상품이 이미 존재합니다."),
    NOT_EXIST_CUSTOMER(-203, HttpStatus.BAD_REQUEST, "존재하는 판매자가 없습니다."),
    INSUFFICIENT_STOCK(-204, HttpStatus.BAD_REQUEST, "재고가 부족합니다."),
    INVENTORY_UPDATE_FAILED(-205, HttpStatus.BAD_REQUEST, "재고 업데이트에 실패했습니다.");

    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMsg;

    ProductExceptionType(int errorCode, HttpStatus httpStatus, String errorMsg) {
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
