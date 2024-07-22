package kr.or.kosa.ubun2_be.domain.product.exception.image;

import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;
import org.springframework.http.HttpStatus;

public enum ImageExceptionType implements CustomExceptionType {
    NOT_IMAGE_FORMAT(-101, HttpStatus.BAD_REQUEST, "올바른 이미지 형식이 아닙니다."),
    NO_IMAGE_EXTENSION(-102, HttpStatus.BAD_REQUEST, "이미지 확장자가 없습니다."),
    IMAGE_SAVE_FAILED(-103, HttpStatus.BAD_REQUEST, "이미지 저장에 실패했습니다."),
    IMAGE_DELETE_FAILED(-104, HttpStatus.BAD_REQUEST, "이미지 삭제에 실패했습니다."),
    IMAGE_PATH_DECODING_FAILED(-105, HttpStatus.BAD_REQUEST, "이미지 경로확인에 실패했습니다."),
    EMPTY_IMAGE(-106, HttpStatus.BAD_REQUEST, "이미지가 없습니다.");

    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMsg;

    ImageExceptionType(int errorCode, HttpStatus httpStatus, String errorMsg) {
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
