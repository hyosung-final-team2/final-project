package kr.or.kosa.ubun2_be.global.exception.base;

public abstract class CustomException extends RuntimeException{
    public abstract CustomExceptionType getExceptionType();
}
