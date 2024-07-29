package kr.or.kosa.ubun2_be.domain.order.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.core.types.dsl.StringPath;
import com.querydsl.jpa.JPQLQuery;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static kr.or.kosa.ubun2_be.domain.customer.entity.QCustomer.customer;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMemberCustomer.memberCustomer;
import static kr.or.kosa.ubun2_be.domain.order.entity.QSubscriptionOrder.subscriptionOrder;
import static kr.or.kosa.ubun2_be.domain.order.entity.QSubscriptionOrderProduct.subscriptionOrderProduct;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QAccountPayment.accountPayment;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QCardPayment.cardPayment;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QPaymentMethod.paymentMethod;
import static kr.or.kosa.ubun2_be.domain.product.entity.QProduct.product;

public class SubscriptionOrderRepositoryImpl extends QuerydslRepositorySupport implements SubscriptionOrderRepositoryCustom {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;
    private static final List<String> STRING_SEARCH_FIELDS = List.of("orderStatus","memberName");
    private static final List<String> DATE_SEARCH_FIELDS = List.of("createdAt");

    public SubscriptionOrderRepositoryImpl() {
        super(SubscriptionOrder.class);
    }

    @Override
    public List<SubscriptionOrder> findSubscriptionOrdersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest) {
        JPQLQuery<SubscriptionOrder> query = from(subscriptionOrder)
                .distinct()
                .leftJoin(subscriptionOrder.member, member).fetchJoin()
                .join(member.memberCustomers, memberCustomer)
                .leftJoin(subscriptionOrder.subscriptionOrderProducts, subscriptionOrderProduct).fetchJoin()
                .leftJoin(subscriptionOrder.paymentMethod, paymentMethod).fetchJoin()
                .leftJoin(accountPayment).on(paymentMethod.paymentMethodId.eq(accountPayment.paymentMethodId))
                .leftJoin(cardPayment).on(paymentMethod.paymentMethodId.eq(cardPayment.paymentMethodId))
                .where(
                        memberCustomer.customer.customerId.eq(customerId),
                        subscriptionOrder.orderStatus.ne(OrderStatus.PENDING),
                        searchCondition(searchRequest)
                );

        return query.fetch();
    }

    @Override
    public List<SubscriptionOrder> findPendingSubscriptionOrdersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest) {
        JPQLQuery<SubscriptionOrder> query = from(subscriptionOrder)
                .distinct()
                .leftJoin(subscriptionOrder.member, member).fetchJoin()
                .join(member.memberCustomers, memberCustomer)
                .leftJoin(subscriptionOrder.subscriptionOrderProducts, subscriptionOrderProduct).fetchJoin()
                .leftJoin(subscriptionOrder.paymentMethod, paymentMethod).fetchJoin()
                .leftJoin(accountPayment).on(paymentMethod.paymentMethodId.eq(accountPayment.paymentMethodId))
                .leftJoin(cardPayment).on(paymentMethod.paymentMethodId.eq(cardPayment.paymentMethodId))
                .where(
                        memberCustomer.customer.customerId.eq(customerId),
                        subscriptionOrder.orderStatus.eq(OrderStatus.PENDING),
                        searchCondition(searchRequest)
                );

        return query.fetch();
    }

    @Override
    public Optional<SubscriptionOrder> findPendingSubscriptionOrderByIdAndCustomerId(Long subscriptionOrderId, Long customerId) {
        JPQLQuery<SubscriptionOrder> query = from(subscriptionOrder)
                .distinct()
                .leftJoin(subscriptionOrder.member, member).fetchJoin()
                .join(member.memberCustomers, memberCustomer)
                .where(
                        subscriptionOrder.subscriptionOrderId.eq(subscriptionOrderId),
                        memberCustomer.customer.customerId.eq(customerId),
                        subscriptionOrder.orderStatus.eq(OrderStatus.PENDING),
                        subscriptionOrder.subscriptionOrderProducts.any().cycleNumber.eq(1)
                );

        return Optional.ofNullable(query.fetchOne());
    }


    private BooleanBuilder searchCondition(SearchRequest searchRequest) {
        if (searchRequest == null || searchRequest.getSearchCategory() == null || searchRequest.getSearchKeyword() == null) {
            return null;
        }
        String category = searchRequest.getSearchCategory();
        String keyword = searchRequest.getSearchKeyword();

        ComparableExpressionBase<?> path = getPath(category);
        if (path == null) {
            return new BooleanBuilder();
        }

        if (STRING_SEARCH_FIELDS.contains(category)) {
            return new BooleanBuilder().and(((StringPath) path).containsIgnoreCase(keyword));
        } else if (DATE_SEARCH_FIELDS.contains(category)) {
            return dateTimeSearch((DateTimePath<LocalDateTime>) path, keyword);
        }

        return new BooleanBuilder();
    }

    private ComparableExpressionBase<?> getPath(String property) {
        return switch (property) {
            case "orderStatus" -> subscriptionOrder.orderStatus;
            case "createdAt" -> subscriptionOrder.createdAt;
            case "memberName" -> member.memberName;
            case "paymentType" -> subscriptionOrder.paymentMethod.paymentType;
            default -> null;
        };
    }

    private BooleanBuilder dateTimeSearch(DateTimePath<LocalDateTime> path, String keyword) {
        String[] range = keyword.split(",");
        if (range.length != 2) return new BooleanBuilder();

        try {
            LocalDate startDate = LocalDate.parse(range[0].trim(), DATE_FORMATTER);
            LocalDate endDate = LocalDate.parse(range[1].trim(), DATE_FORMATTER);

            LocalDateTime startDateTime = startDate.atStartOfDay();
            LocalDateTime endDateTime = endDate.atTime(LocalTime.MAX);

            return new BooleanBuilder()
                    .and(path.goe(startDateTime))
                    .and(path.lt(endDateTime.plusDays(1))); // 다음 날의 시작 직전까지
        } catch (DateTimeParseException e) {
            return new BooleanBuilder();
        }
    }

  public List<SubscriptionOrder> findSubscriptionOrderByDateRangeAndCustomerId(LocalDateTime startDate , LocalDateTime endDate, Long customerId) {

        return from(subscriptionOrder)
                .join(subscriptionOrder.subscriptionOrderProducts, subscriptionOrderProduct)
                .join(subscriptionOrder.member, member)
                .join(member.memberCustomers, memberCustomer)
                .join(memberCustomer.customer, customer)
                .where(customer.customerId.eq(customerId)
                        .and(subscriptionOrder.createdAt.between(startDate, endDate)
                                .and(subscriptionOrder.orderStatus.eq(OrderStatus.APPROVED))))
                .fetch();
    }

  public List<SubscriptionOrder> findAllSubscriptionOrderByDateRangeAndCustomerId(LocalDateTime startDate , LocalDateTime endDate, Long customerId) {

        return from(subscriptionOrder)
                .join(subscriptionOrder.subscriptionOrderProducts, subscriptionOrderProduct)
                .join(subscriptionOrderProduct.product, product)
                .join(product.customer, customer)
                .where(customer.customerId.eq(customerId)
                        .and(subscriptionOrder.createdAt.between(startDate, endDate)))
                .fetch();
  }

    @Override
    public Optional<SubscriptionOrder> findSubscriptionOrderByIdAndCustomerId(Long orderId, Long customerId) {
        return Optional.ofNullable(
                from(subscriptionOrder)
                        .join(subscriptionOrder.member, member).fetchJoin()
                        .join(subscriptionOrder.paymentMethod).fetchJoin()
                        .join(subscriptionOrder.address).fetchJoin()
                        .leftJoin(subscriptionOrder.subscriptionOrderProducts, subscriptionOrderProduct).fetchJoin()
                        .join(member.memberCustomers, memberCustomer)
                        .join(memberCustomer.customer)
                        .where(subscriptionOrder.subscriptionOrderId.eq(orderId)
                                .and(memberCustomer.customer.customerId.eq(customerId)))
                        .fetchOne()
        );
    }

    @Override
    public Optional<Integer> findLatestCycleNumberByCustomerIdAndOrderId(Long customerId, Long orderId) {
        return Optional.ofNullable(
                from(subscriptionOrder)
                        .join(subscriptionOrder.subscriptionOrderProducts, subscriptionOrderProduct)
                        .join(subscriptionOrder.member, member)
                        .join(member.memberCustomers, memberCustomer)
                        .where(memberCustomer.customer.customerId.eq(customerId)
                                .and(subscriptionOrder.subscriptionOrderId.eq(orderId)))
                        .select(subscriptionOrderProduct.cycleNumber.max())
                        .fetchOne()
        );
    }

    @Override
    public List<Object[]> findTopSellingProductsByCustomerId(Long customerId, LocalDateTime startDate, LocalDateTime endDate) {
        List<Tuple> tuples = from(subscriptionOrderProduct)
                .select(product.productId,product.productName,subscriptionOrderProduct.quantity.sum())
                .join(subscriptionOrderProduct.subscriptionOrder, subscriptionOrder)
                .join(subscriptionOrderProduct.product, product)
                .join(subscriptionOrder.member.memberCustomers, memberCustomer)
                .where(memberCustomer.customer.customerId.eq(customerId)
                        .and(subscriptionOrder.createdAt.between(startDate, endDate))
                        .and(subscriptionOrder.orderStatus.eq(OrderStatus.APPROVED)))
                .groupBy(product.productId, product.productName)
                .orderBy(subscriptionOrderProduct.quantity.sum().desc())
                .fetch();


        return tuples.stream()
                .map(tuple -> new Object[]{
                        tuple.get(product.productId),
                        tuple.get(product.productName),
                        tuple.get(subscriptionOrderProduct.quantity.sum())
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<Address> findAddressesByDateRange(Long customerId, LocalDateTime startDate, LocalDateTime endDate) {
        return from(subscriptionOrder)
                .select(subscriptionOrder.address)
                .join(subscriptionOrder.member.memberCustomers, memberCustomer)
                .where(memberCustomer.customer.customerId.eq(customerId)
                        .and(subscriptionOrder.createdAt.between(startDate, endDate))
                        .and(subscriptionOrder.orderStatus.eq(OrderStatus.APPROVED)))
                .fetch();
    }

    @Override
    public Long countSubscriptionOrdersByCustomerAndDateRange(LocalDateTime startDate , LocalDateTime endDate, Long customerId) {

        JPQLQuery<Long> query = from(subscriptionOrder)
                .join(subscriptionOrder.member, member)
                .join(member.memberCustomers, memberCustomer)
                .join(memberCustomer.customer, customer)
                .where(customer.customerId.eq(customerId)
                        .and(subscriptionOrder.createdAt.between(startDate, endDate))
                        .and(subscriptionOrder.orderStatus.eq(OrderStatus.APPROVED)))
                .select(subscriptionOrder.countDistinct());

        return query.fetchOne() != null ? query.fetchOne() : Long.valueOf(0L);
    }

    @Override
    public Long sumSubscriptionOrderTotalByCustomerAndDateRange(LocalDateTime startDate , LocalDateTime endDate, Long customerId) {
        JPQLQuery<Long> query = from(subscriptionOrder)
                .join(subscriptionOrder.subscriptionOrderProducts, subscriptionOrderProduct)
                .join(subscriptionOrder.member, member)
                .join(member.memberCustomers, memberCustomer)
                .join(memberCustomer.customer, customer)
                .where(customer.customerId.eq(customerId)
                        .and(subscriptionOrder.createdAt.between(startDate, endDate))
                        .and(subscriptionOrder.orderStatus.eq(OrderStatus.APPROVED))
                        .and(subscriptionOrderProduct.orderProductStatus.eq(OrderProductStatus.APPROVED)))
                .select(subscriptionOrderProduct.price.multiply(
                                Expressions.asNumber(1).subtract(subscriptionOrderProduct.discount.divide(100.0)))
                        .multiply(subscriptionOrderProduct.quantity).sum().longValue());

        return query.fetchOne() != null ? query.fetchOne() : Long.valueOf(0L);
    }

}