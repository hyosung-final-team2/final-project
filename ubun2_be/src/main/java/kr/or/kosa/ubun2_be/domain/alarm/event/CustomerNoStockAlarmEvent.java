package kr.or.kosa.ubun2_be.domain.alarm.event;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import lombok.Getter;

@Getter
public class CustomerNoStockAlarmEvent {
    private final Customer customer;
    private final String productName;

    public CustomerNoStockAlarmEvent(Customer customer, String productName) {
        this.customer = customer;
        this.productName = productName;
    }
}
