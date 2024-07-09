package kr.or.kosa.ubun2_be.domain.paymentmethod.repository.impl;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.MemberPaymentMethodsResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.PaymentMethodRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QAccountPayment.accountPayment;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QCardPayment.cardPayment;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QPaymentMethod.paymentMethod;

@Repository
public class PaymentMethodRepositoryImpl extends QuerydslRepositorySupport implements PaymentMethodRepositoryCustom {

    public PaymentMethodRepositoryImpl() {
        super(PaymentMethod.class);
    }

    @Override
    public Page<CardPaymentResponse> findAllCardPaymentMethodsByMemberId(Long memberId, Pageable pageable) {

        JPQLQuery<CardPaymentResponse> query = from(paymentMethod)
                .join(paymentMethod.member, member)
                .join(cardPayment)
                .on(paymentMethod.paymentMethodId.eq(cardPayment.paymentMethodId))
                .where(paymentMethod.paymentType.eq("CARD"))
                .select(Projections.constructor(CardPaymentResponse.class, paymentMethod.paymentMethodId, member.memberEmail, member.memberName, paymentMethod.paymentType, cardPayment.cardCompanyName, cardPayment.cardNumber));

        long total = query.fetchCount();
        List<CardPaymentResponse> results = getQuerydsl().applyPagination(pageable, query).fetch();

        return new PageImpl<>(results, pageable, total);
    }

    @Override
    public Page<AccountPaymentResponse> findAllAccountPaymentMethodsByMemberId(Long memberId, Pageable pageable) {
        JPQLQuery<AccountPaymentResponse> query = from(paymentMethod)
                .join(paymentMethod.member, member)
                .join(accountPayment).on(paymentMethod.paymentMethodId.eq(accountPayment.paymentMethodId))
                .where(paymentMethod.paymentType.eq("ACCOUNT"))
                .select(Projections.constructor(AccountPaymentResponse.class, paymentMethod.paymentMethodId, member.memberEmail, member.memberName, paymentMethod.paymentType, accountPayment.bankName, accountPayment.accountNumber));

        long total = query.fetchCount();
        List<AccountPaymentResponse> results = getQuerydsl().applyPagination(pageable, query).fetch();

        return new PageImpl<>(results, pageable, total);
    }

    @Override
    public Optional<PaymentMethodDetailResponse> findPaymentMethodDetailbyPaymentMethodId(Long paymentMethodId) {
        Tuple memberInfo = from(paymentMethod)
                .join(paymentMethod.member, member)
                .where(paymentMethod.paymentMethodId.eq(paymentMethodId))
                .select(member.memberName, member.memberEmail, member.memberPhone, member.createdAt)
                .fetchOne();

        return Optional.ofNullable(memberInfo).map(info -> {
            List<MemberPaymentMethodsResponse> paymentMethods = from(paymentMethod)
                    .leftJoin(accountPayment).on(paymentMethod.paymentMethodId.eq(accountPayment.paymentMethodId))
                    .leftJoin(cardPayment).on(paymentMethod.paymentMethodId.eq(cardPayment.paymentMethodId))
                    .where(paymentMethod.member.memberId.eq(
                            JPAExpressions.select(paymentMethod.member.memberId)
                                    .from(paymentMethod)
                                    .where(paymentMethod.paymentMethodId.eq(paymentMethodId))
                    ))
                    .select(Projections.constructor(MemberPaymentMethodsResponse.class,
                            paymentMethod.paymentMethodId,
                            accountPayment.accountNumber,
                            accountPayment.bankName,
                            cardPayment.cardCompanyName,
                            cardPayment.cardNumber,
                            paymentMethod.paymentType))
                    .fetch();

            return PaymentMethodDetailResponse.builder()
                    .memberEmail(info.get(member.memberEmail))
                    .memberName(info.get(member.memberName))
                    .memberPhone(info.get(member.memberPhone))
                    .registrationDate(info.get(member.createdAt))
                    .paymentMethods(paymentMethods)
                    .build();
        });
    }
}