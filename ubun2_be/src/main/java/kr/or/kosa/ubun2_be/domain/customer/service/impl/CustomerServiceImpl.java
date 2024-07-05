package kr.or.kosa.ubun2_be.domain.customer.service.impl;

import kr.or.kosa.ubun2_be.domain.customer.dto.SignupRequest;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerExceptionType;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Customer findById(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerException(CustomerExceptionType.NOT_EXIST_CUSTOMER));
    }

    @Override
    @Transactional
    public void createCustomer(SignupRequest signupRequest) {
        if (isExistCustomerLoginId(signupRequest.getCustomerLoginId())) {
            throw new CustomerException(CustomerExceptionType.DUPLICATE_CUSTOMER_LOGIN_ID);
        }
        customerRepository.save(signupRequest.toEntity(passwordEncoder));
    }

    @Override
    public boolean isExistCustomerLoginId(String customerLoginId) {
        return customerRepository.existsByCustomerLoginId(customerLoginId);
    }


}
