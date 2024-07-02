package kr.or.kosa.ubun2_be.domain.customer.repository;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
}
