package kr.or.kosa.ubun2_be.domain.paymentmethod.repository;

import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PaymentMethodRepository extends JpaRepository<PaymentMethod, Long>, PaymentMethodRepositoryCustom {
    List<PaymentMethod> findByMemberMemberId(Long memberId);

    boolean existsByPaymentMethodIdAndMemberMemberId(Long PaymentMethodId, Long memberId);
}
