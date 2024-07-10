package kr.or.kosa.ubun2_be.domain.paymentmethod.repository;

import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface PaymentMethodRepositoryCustom {
    Page<PaymentMethod> findAllCardPaymentMethodsByMemberId(Long memberId, Pageable pageable, Long customerId);
    Page<PaymentMethod> findAllAccountPaymentMethodsByMemberId(Long memberId, Pageable pageable, Long customerId);
    Optional<PaymentMethod> findPaymentMethodbyPaymentMethodIdAndCustomerId(Long paymentMethodId, Long customerId);
}