package kr.or.kosa.ubun2_be.domain.paymentmethod.repository;

import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface PaymentMethodRepositoryCustom {
    Page<CardPaymentResponse> findAllCardPaymentMethodsByMemberId(Long memberId, Pageable pageable);
    Page<AccountPaymentResponse> findAllAccountPaymentMethodsByMemberId(Long memberId, Pageable pageable);
    Optional<PaymentMethodDetailResponse> findPaymentMethodDetailbyPaymentMethodId(Long paymentMethodId);
}