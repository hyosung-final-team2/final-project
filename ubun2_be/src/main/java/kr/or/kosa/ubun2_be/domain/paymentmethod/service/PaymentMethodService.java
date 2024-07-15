package kr.or.kosa.ubun2_be.domain.paymentmethod.service;

import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PaymentMethodService {
    Page<CardPaymentResponse> getAllCardPaymentMethodsForMember(Pageable pageable, Long customerId);

    Page<AccountPaymentResponse> getAllAccountPaymentMethodsForMember(Pageable pageable, Long customerId);

    PaymentMethodDetailResponse getPaymentMethodDetailByMemberId(Long paymentMethodId, Long customerId);

    void addPaymentMethod(PaymentMethodRequest paymentMethodRequest, Long customerId);

    void updatePaymentMethod(Long paymentMethodId, PaymentMethodRequest paymentMethodRequest, Long customerId);

    void deletePaymentMethod(Long paymentMethodId, Long customerId);
}
