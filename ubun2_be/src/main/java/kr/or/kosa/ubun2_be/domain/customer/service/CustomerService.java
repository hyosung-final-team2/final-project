package kr.or.kosa.ubun2_be.domain.customer.service;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;

public interface CustomerService {
    Customer findById(Long customerId);
}
