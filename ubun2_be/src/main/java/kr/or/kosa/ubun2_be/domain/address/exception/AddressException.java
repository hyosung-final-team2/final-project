package kr.or.kosa.ubun2_be.domain.address.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class AddressException extends CustomException {
    private AddressExceptionType AddressExceptionType;

    public AddressException(AddressExceptionType addressExceptionType) {
        this.AddressExceptionType = addressExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.AddressExceptionType;
    }
}
