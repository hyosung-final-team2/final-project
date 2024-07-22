package kr.or.kosa.ubun2_be.domain.product.exception.image;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class ImageException extends CustomException {
    private ImageExceptionType imageExceptionType;

    public ImageException(ImageExceptionType imageExceptionType) {
        this.imageExceptionType = imageExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.imageExceptionType;
    }
}
