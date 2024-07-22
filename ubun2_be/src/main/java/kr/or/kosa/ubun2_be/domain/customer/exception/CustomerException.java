package kr.or.kosa.ubun2_be.domain.customer.exception;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class CustomerException extends CustomException {
    private CustomerExceptionType customerExceptionType;

    public CustomerException(CustomerExceptionType customerExceptionType) {
        this.customerExceptionType = customerExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.customerExceptionType;
    }
}
