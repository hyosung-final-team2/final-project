package kr.or.kosa.ubun2_be.domain.paymentmethod.repository;

import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccountPaymentRepository extends JpaRepository<AccountPayment, Long> {
}
