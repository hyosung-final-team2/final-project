package kr.or.kosa.ubun2_be.domain.customer.service;

import kr.or.kosa.ubun2_be.domain.customer.dto.SignupRequest;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;

public interface CustomerService {
    Customer findById(Long customerId);

    void createCustomer(SignupRequest signupRequest);

    boolean isExistCustomerEmail(String customerEmail);
}
