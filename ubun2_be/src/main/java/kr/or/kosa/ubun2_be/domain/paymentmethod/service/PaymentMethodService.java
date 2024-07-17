package kr.or.kosa.ubun2_be.domain.paymentmethod.service;

import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.MyAccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.MyCardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.RegisterPaymentMethodRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.UpdatePaymentMethodRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PaymentMethodService {
    Page<CardPaymentResponse> getAllCardPaymentMethodsForMember(Pageable pageable, Long customerId);

    Page<AccountPaymentResponse> getAllAccountPaymentMethodsForMember(Pageable pageable, Long customerId);

    PaymentMethodDetailResponse getPaymentMethodDetailByMemberId(Long paymentMethodId, Long customerId);

    void addPaymentMethod(PaymentMethodRequest paymentMethodRequest, Long customerId);

    void deletePaymentMethod(Long paymentMethodId, Long customerId);

    //회원의 결제수단

    List<MyCardPaymentResponse> getMyCardPaymentMethods(Long memberId);

    List<MyAccountPaymentResponse> getMyAccountPaymentMethods(Long memberId);

    MyAccountPaymentResponse getMyAccountPaymentMethod(Long paymentMethodId, Long memberId);

    MyCardPaymentResponse getMyCardPaymentMethod(Long paymentMethodId, Long memberId);

    void registerPaymentMethod(RegisterPaymentMethodRequest registerPaymentMethodRequest, Long memberId);

    void updatePaymentMethod(Long paymentMethodId, UpdatePaymentMethodRequest updatePaymentMethodRequest, Long memberId);

    void deleteMyPaymentMethod(Long paymentMethodId, Long memberId);
}
