package kr.or.kosa.ubun2_be.domain.customer.repository;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    boolean existsByCustomerLoginId(String CustomerLoginId);

    Optional<Customer> findByCustomerLoginId(String CustomerLoginId);
}
