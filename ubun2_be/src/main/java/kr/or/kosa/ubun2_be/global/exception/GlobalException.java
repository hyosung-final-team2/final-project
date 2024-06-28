package kr.or.kosa.ubun2_be.global.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class GlobalException extends CustomException {
    private GlobalExceptionType globalExceptionType;

    public GlobalException(GlobalExceptionType globalExceptionType){
        this.globalExceptionType = globalExceptionType;
    }
    @Override
    public CustomExceptionType getExceptionType() {
        return this.globalExceptionType;
    }
}
