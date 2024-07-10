package kr.or.kosa.ubun2_be.domain.paymentmethod.repository.impl;

import com.querydsl.core.QueryResults;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.PaymentMethodRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static kr.or.kosa.ubun2_be.domain.customer.entity.QCustomer.customer;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMemberCustomer.memberCustomer;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QAccountPayment.accountPayment;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QCardPayment.cardPayment;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QPaymentMethod.paymentMethod;

@Repository
public class PaymentMethodRepositoryImpl extends QuerydslRepositorySupport implements PaymentMethodRepositoryCustom {

    public PaymentMethodRepositoryImpl() {
        super(PaymentMethod.class);
    }

    @Override
    public Page<PaymentMethod> findAllCardPaymentMethodsByMemberId(Long memberId, Pageable pageable, Long customerId) {

        QueryResults<PaymentMethod> results = from(paymentMethod)
                .join(paymentMethod.member, member)
                .join(cardPayment)
                .on(paymentMethod.paymentMethodId.eq(cardPayment.paymentMethodId))
                .join(member.memberCustomers, memberCustomer)
                .where(paymentMethod.paymentType.eq("CARD").and(memberCustomer.customer.customerId.eq(customerId)))
                .fetchResults();

        long total = results.getTotal();
        List<PaymentMethod> content = results.getResults();

        return new PageImpl<>(content, pageable, total);
    }

    @Override
    public Page<PaymentMethod> findAllAccountPaymentMethodsByMemberId(Long memberId, Pageable pageable, Long customerId) {
        QueryResults<PaymentMethod> results = from(paymentMethod)
                .join(paymentMethod.member, member)
                .join(accountPayment)
                .on(paymentMethod.paymentMethodId.eq(accountPayment.paymentMethodId))
                .join(member.memberCustomers, memberCustomer)
                .where(paymentMethod.paymentType.eq("ACCOUNT").and(memberCustomer.customer.customerId.eq(customerId)))
                .fetchResults();

        long total = results.getTotal();
        List<PaymentMethod> content = results.getResults();

        return new PageImpl<>(content, pageable, total);
    }

    @Override
    public Optional<PaymentMethod> findPaymentMethodbyPaymentMethodIdAndCustomerId(Long paymentMethodId, Long customerId) {
        PaymentMethod result = from(paymentMethod)
                .join(paymentMethod.member, member)
                .join(member.memberCustomers, memberCustomer)
                .join(memberCustomer.customer,customer)
                .where(paymentMethod.paymentMethodId.eq(paymentMethodId)
                        .and(customer.customerId.eq(customerId)))
                .fetchOne();

        return Optional.ofNullable(result);
    }
}