package kr.or.kosa.ubun2_be.domain.address.exception.address;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class AddressException extends CustomException {
    private AddressExceptionType addressExceptionType;

    public AddressException(AddressExceptionType addressExceptionType) {
        this.addressExceptionType = addressExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.addressExceptionType;
    }
}
