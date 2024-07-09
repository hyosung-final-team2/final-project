package kr.or.kosa.ubun2_be.domain.paymentmethod.service;

import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PaymentMethodService {
    Page<CardPaymentResponse> getAllCardPaymentMethodsForMember(CardPaymentRequest request, Pageable pageable);

    Page<AccountPaymentResponse> getAllAccountPaymentMethodsForMember(AccountPaymentRequest request, Pageable pageable);

    PaymentMethodDetailResponse getPaymentMethodDetailByMemberId(PaymentMethodDetailRequest request);

    void addPaymentMethod(PaymentMethodRequest paymentMethodRequest);

    void updatePaymentMethod(Long paymentMethodId, PaymentMethodRequest paymentMethodRequest);

    void deletePaymentMethod(Long paymentMethodId);
}
