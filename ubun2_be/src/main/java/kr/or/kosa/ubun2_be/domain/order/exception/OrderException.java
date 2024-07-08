package kr.or.kosa.ubun2_be.domain.order.exception;

import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerExceptionType;
import kr.or.kosa.ubun2_be.global.exception.base.CustomException;
import kr.or.kosa.ubun2_be.global.exception.base.CustomExceptionType;

public class OrderException extends CustomException {
    private OrderExceptionType orderExceptionType;

    public OrderException(OrderExceptionType orderExceptionType) {
        this.orderExceptionType = orderExceptionType;
    }

    @Override
    public CustomExceptionType getExceptionType() {
        return this.orderExceptionType;
    }
}
