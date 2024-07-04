package kr.or.kosa.ubun2_be.domain.customer.service.impl;

import kr.or.kosa.ubun2_be.domain.customer.dto.SignupRequest;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerExceptionType;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    @Override
    public Customer findById(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerException(CustomerExceptionType.NOT_EXIST_CUSTOMER));
        return customer;
    }

    @Override
    @Transactional
    public void createCustomer(SignupRequest signupRequest) {
        if (isExistCustomerEmail(signupRequest.getCustomerEmail())) {
            throw new CustomerException(CustomerExceptionType.DUPLICATE_CUSTOMER_EMAIL);
        }
        customerRepository.save(signupRequest.toEntity(bCryptPasswordEncoder));
    }

    @Override
    public boolean isExistCustomerEmail(String customerEmail) {
        return customerRepository.existsByCustomerEmail(customerEmail);
    }


}
