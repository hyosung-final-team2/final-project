package kr.or.kosa.ubun2_be.global.service;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.global.dto.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final CustomerRepository customerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Customer> customerData = customerRepository.findByCustomerLoginId(username);
        return customerData.map(CustomUserDetails::new)
                .orElseThrow(() -> {
                    return new UsernameNotFoundException("User not found with login ID: " + username);
                });
    }
}
