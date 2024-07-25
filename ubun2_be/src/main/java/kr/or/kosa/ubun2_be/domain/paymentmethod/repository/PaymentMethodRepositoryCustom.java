package kr.or.kosa.ubun2_be.domain.paymentmethod.repository;

import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface PaymentMethodRepositoryCustom {
    Page<PaymentMethod> findAllCardPaymentMethodsByMemberId(Pageable pageable, SearchRequest searchRequest, Long customerId);
    Page<PaymentMethod> findAllAccountPaymentMethodsByMemberId(Pageable pageable, SearchRequest searchRequest, Long customerId);
    Optional<PaymentMethod> findPaymentMethodByPaymentMethodIdAndCustomerId(Long paymentMethodId, Long customerId);
    boolean checkIsMyMember(Long customerId, Long memberId);
}