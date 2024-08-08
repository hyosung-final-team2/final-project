package kr.or.kosa.ubun2_be.domain.paymentmethod.repository.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.StringPath;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.paymentmethod.enums.PaymentMethodOption;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.PaymentMethodRepositoryCustom;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
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

    private static final List<String> CARD_SEARCH_FIELDS = List.of("memberEmail", "memberName", "paymentType", "cardCompany", "cardNumber");
    private static final List<String> ACCOUNT_SEARCH_FIELDS = List.of("memberEmail", "memberName", "paymentType", "bankName", "accountNumber");

    public PaymentMethodRepositoryImpl() {
        super(PaymentMethod.class);
    }

    @Override
    public Page<PaymentMethod> findAllCardPaymentMethodsByMemberId(Pageable pageable, SearchRequest searchRequest, Long customerId) {

        QueryResults<PaymentMethod> results = from(paymentMethod)
                .join(paymentMethod.member, member)
                .join(cardPayment)
                .on(paymentMethod.paymentMethodId.eq(cardPayment.paymentMethodId))
                .join(member.memberCustomers, memberCustomer)
                .where(paymentMethod.isDeleted.isFalse(), paymentMethod.paymentType.eq(String.valueOf(PaymentMethodOption.CARD)).and(memberCustomer.customer.customerId.eq(customerId)), paymentMethodSearch(searchRequest, PaymentMethodOption.CARD))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(paymentMethodSort(pageable).toArray(OrderSpecifier[]::new))
                .fetchResults();

        long total = results.getTotal();
        List<PaymentMethod> content = results.getResults();

        return new PageImpl<>(content, pageable, total);
    }

    private BooleanBuilder paymentMethodSearch(SearchRequest searchRequest, PaymentMethodOption paymentMethodOption) {
        if (searchRequest == null || searchRequest.getSearchCategory() == null || searchRequest.getSearchKeyword() == null) {
            return null;
        }
        String category = searchRequest.getSearchCategory();
        String keyword = searchRequest.getSearchKeyword();

        ComparableExpressionBase<?> path = getPath(category);
        if (path == null) {
            return new BooleanBuilder();
        }
        if (paymentMethodOption.equals(PaymentMethodOption.CARD) && CARD_SEARCH_FIELDS.contains(category)) {
            return new BooleanBuilder().and(((StringPath) path).containsIgnoreCase(keyword));
        } else if (paymentMethodOption.equals(PaymentMethodOption.ACCOUNT) && ACCOUNT_SEARCH_FIELDS.contains(category)) {
            return new BooleanBuilder().and(((StringPath) path).containsIgnoreCase(keyword));
        }
        return new BooleanBuilder();
    }

    @Override
    public Page<PaymentMethod> findAllAccountPaymentMethodsByMemberId(Pageable pageable, SearchRequest searchRequest, Long customerId) {
        QueryResults<PaymentMethod> results = from(paymentMethod)
                .join(paymentMethod.member, member)
                .join(accountPayment)
                .on(paymentMethod.paymentMethodId.eq(accountPayment.paymentMethodId))
                .join(member.memberCustomers, memberCustomer)
                .where(paymentMethod.isDeleted.isFalse(), paymentMethod.paymentType.eq(String.valueOf(PaymentMethodOption.ACCOUNT)).and(memberCustomer.customer.customerId.eq(customerId)), paymentMethodSearch(searchRequest, PaymentMethodOption.ACCOUNT))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(paymentMethodSort(pageable).toArray(OrderSpecifier[]::new))
                .fetchResults();

        long total = results.getTotal();
        List<PaymentMethod> content = results.getResults();

        return new PageImpl<>(content, pageable, total);
    }

    private ComparableExpressionBase<?> getPath(String property) {
        return switch (property) {
            case "memberEmail" -> member.memberEmail;
            case "memberName" -> member.memberName;
            case "paymentType" -> paymentMethod.paymentType;
            case "bankName" -> accountPayment.bankName;
            case "accountNumber" -> accountPayment.accountNumber;
            case "cardNumber" -> cardPayment.cardNumber;
            case "cardCompany" -> cardPayment.cardCompanyName;
            case "createdAt" -> paymentMethod.createdAt;
            default -> null;
        };
    }

    private List<OrderSpecifier<?>> paymentMethodSort(Pageable pageable) {
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();
        if (!ObjectUtils.isEmpty(pageable.getSort())) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                OrderSpecifier<?> orderSpecifier = createOrderSpecifier(direction, order.getProperty());
                if (orderSpecifier != null) {
                    orderSpecifiers.add(orderSpecifier);
                }
            }
        }
        return orderSpecifiers;
    }

    private OrderSpecifier<?> createOrderSpecifier(Order direction, String property) {
        ComparableExpressionBase<?> path = getPath(property);
        if (path != null) {
            return new OrderSpecifier<>(direction, path);
        }
        return null;
    }

    @Override
    public Optional<PaymentMethod> findPaymentMethodByPaymentMethodIdAndCustomerId(Long paymentMethodId, Long customerId) {
        PaymentMethod result = from(paymentMethod)
                .join(paymentMethod.member, member)
                .join(member.memberCustomers, memberCustomer)
                .join(memberCustomer.customer, customer)
                .where(paymentMethod.isDeleted.isFalse(), paymentMethod.paymentMethodId.eq(paymentMethodId)
                        .and(customer.customerId.eq(customerId)))
                .fetchOne();

        return Optional.ofNullable(result);
    }

    @Override
    public boolean checkIsMyMember(Long customerId, Long memberId) {
        Long count = from(memberCustomer)
                .where(memberCustomer.customer.customerId.eq(customerId)
                        .and(memberCustomer.member.memberId.eq(memberId)))
                .fetchCount();

        return count > 0;
    }
}