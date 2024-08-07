package kr.or.kosa.ubun2_be.domain.paymentmethod.repository;

import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CardPaymentRepository extends JpaRepository<CardPayment, Long> {
   // Optional<CardPayment> findByIsDeletedFalseAndPaymentMethodId(Long paymentMethodId);

    Optional<CardPayment> findByPaymentMethodId(Long paymentMethodId);
}
