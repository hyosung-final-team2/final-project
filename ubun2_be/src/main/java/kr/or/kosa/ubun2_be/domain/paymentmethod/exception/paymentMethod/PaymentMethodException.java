package kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod;

import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class PaymentMethodException extends CustomException {
    private PaymentMethodExceptionType paymentMethodExceptionType;

    public PaymentMethodException(PaymentMethodExceptionType paymentMethodExceptionType) {
        this.paymentMethodExceptionType = paymentMethodExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.paymentMethodExceptionType;
    }
}