package kr.or.kosa.ubun2_be.domain.customer.repository;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long>, CustomerRepositoryCustom {

    boolean existsByCustomerLoginId(String CustomerLoginId);

    Optional<Customer> findByCustomerLoginId(String CustomerLoginId);

    Optional<Customer> findByCustomerEmail(String customerEmail);

    @Query("SELECT c.businessName FROM Customer c WHERE c.customerId = :customerId")
    String findBusinessNameByCustomerId(Long customerId);
}
