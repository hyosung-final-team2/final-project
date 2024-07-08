package kr.or.kosa.ubun2_be.domain.address.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class AddressException extends CustomException {
    private kr.or.kosa.ubun2_be.domain.address.exception.AddressExceptionType AddressExceptionType;

    public AddressException(kr.or.kosa.ubun2_be.domain.address.exception.AddressExceptionType customerExceptionType) {
        this.AddressExceptionType = customerExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.AddressExceptionType;
    }
}
