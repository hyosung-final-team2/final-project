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
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.*;
import java.util.stream.Collectors;

import static kr.or.kosa.ubun2_be.domain.customer.entity.QCustomer.customer;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMemberCustomer.memberCustomer;
import static kr.or.kosa.ubun2_be.domain.order.entity.QOrder.order;
import static kr.or.kosa.ubun2_be.domain.order.entity.QOrderProduct.orderProduct;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QAccountPayment.accountPayment;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QCardPayment.cardPayment;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QPaymentMethod.paymentMethod;
import static kr.or.kosa.ubun2_be.domain.product.entity.QProduct.product;

public class OrderRepositoryImpl extends QuerydslRepositorySupport implements OrderRepositoryCustom {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;
    private static final List<String> STRING_SEARCH_FIELDS = List.of("orderStatus","memberName","paymentType");
    private static final List<String> DATE_SEARCH_FIELDS = List.of("createdAt");

    public OrderRepositoryImpl() {
        super(Order.class);
    }

    @Override
    public List<Order> findOrdersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest) {
        JPQLQuery<Order> query = from(order)
                .distinct()
                .leftJoin(order.member, member).fetchJoin()
                .join(member.memberCustomers, memberCustomer)
                .leftJoin(order.orderProducts, orderProduct).fetchJoin()
                .leftJoin(order.paymentMethod, paymentMethod).fetchJoin()
                .leftJoin(accountPayment).on(paymentMethod.paymentMethodId.eq(accountPayment.paymentMethodId))
                .leftJoin(cardPayment).on(paymentMethod.paymentMethodId.eq(cardPayment.paymentMethodId))
                .where(
                        memberCustomer.customer.customerId.eq(customerId),
                        order.orderStatus.ne(OrderStatus.PENDING),
                        searchCondition(searchRequest)
                );

        return query.fetch();
    }

    @Override
    public List<Order> findPendingOrdersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest) {
        JPQLQuery<Order> query = from(order)
                .distinct()
                .leftJoin(order.member, member).fetchJoin()
                .join(member.memberCustomers, memberCustomer)
                .leftJoin(order.orderProducts, orderProduct).fetchJoin()
                .leftJoin(order.paymentMethod, paymentMethod).fetchJoin()
                .leftJoin(accountPayment).on(paymentMethod.paymentMethodId.eq(accountPayment.paymentMethodId))
                .leftJoin(cardPayment).on(paymentMethod.paymentMethodId.eq(cardPayment.paymentMethodId))
                .where(
                        memberCustomer.customer.customerId.eq(customerId),
                        order.orderStatus.eq(OrderStatus.PENDING),
                        searchCondition(searchRequest)
                );

        return query.fetch();
    }

    @Override
    public Optional<Order> findPendingOrderByIdAndCustomerId(Long orderId, Long customerId) {
        JPQLQuery<Order> query = from(order)
                .distinct()
                .leftJoin(order.member, member).fetchJoin()
                .join(member.memberCustomers, memberCustomer)
                .where(
                        order.orderId.eq(orderId),
                        memberCustomer.customer.customerId.eq(customerId),
                        order.orderStatus.eq(OrderStatus.PENDING)  // PENDING 상태 필터링
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
            case "orderStatus" -> order.orderStatus;
            case "createdAt" -> order.createdAt;
            case "memberName" -> member.memberName;
            case "paymentType" -> order.paymentMethod.paymentType;
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

    @Override
    public List<Order> findOrdersByDateRangeAndCustomerId(LocalDateTime startDate , LocalDateTime endDate, Long customerId) {

        return from(order)
                .join(order.orderProducts, orderProduct)
                .join(order.member, member)
                .join(member.memberCustomers, memberCustomer)
                .join(memberCustomer.customer, customer)
                .where(customer.customerId.eq(customerId)
                        .and(order.createdAt.between(startDate, endDate))
                        .and(order.orderStatus.eq(OrderStatus.APPROVED)))
                .fetch();

    }

    @Override
    public List<Order> findAllOrdersByDateRangeAndCustomerId(LocalDateTime startDate , LocalDateTime endDate, Long customerId) {

        return from(order)
                .join(order.orderProducts, orderProduct)
                .join(orderProduct.product, product)
                .join(product.customer, customer)
                .where(customer.customerId.eq(customerId)
                        .and(order.createdAt.between(startDate, endDate)))
                .fetch();

    }

    @Override
    public List<Object[]> findTopSellingProductsByCustomerId(Long customerId, LocalDateTime startDate, LocalDateTime endDate) {
        List<Tuple> tuples = from(orderProduct)
                .select(product.productId, product.productName, orderProduct.quantity.sum())
                .join(orderProduct.order, order)
                .join(orderProduct.product, product)
                .join(product.customer, customer)
                .where(customer.customerId.eq(customerId)
                        .and(order.createdAt.between(startDate, endDate))
                        .and(order.orderStatus.eq(OrderStatus.APPROVED)))
                .groupBy(product.productId, product.productName)
                .orderBy(orderProduct.quantity.sum().desc())
                .fetch();

        return tuples.stream()
                .map(tuple -> new Object[]{
                        tuple.get(product.productId),
                        tuple.get(product.productName),
                        tuple.get(orderProduct.quantity.sum())
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<Address> findAddressesByDateRange(Long customerId, LocalDateTime startDate, LocalDateTime endDate) {
        List<Tuple> results = from(order)
                .select(order.address, order.orderId)
                .join(order.orderProducts, orderProduct)
                .join(orderProduct.product.customer, customer)
                .where(customer.customerId.eq(customerId)
                        .and(order.createdAt.between(startDate, endDate))
                        .and(order.orderStatus.eq(OrderStatus.APPROVED)))
                .distinct()
                .fetch();
        return  results.stream().map(tuple -> {
            return tuple.get(order.address);
        }).toList();
    }

    @Override
    public Long countOrdersByCustomerAndDateRange(LocalDateTime startDate , LocalDateTime endDate, Long customerId) {

        JPQLQuery<Long> query = from(order)
                .join(order.member, member)
                .join(member.memberCustomers, memberCustomer)
                .join(memberCustomer.customer, customer)
                .where(customer.customerId.eq(customerId)
                        .and(order.createdAt.between(startDate, endDate))
                        .and(order.orderStatus.eq(OrderStatus.APPROVED)))
                .select(order.countDistinct());

        return query.fetchOne() != null ? query.fetchOne() : Long.valueOf(0L);
    }

    @Override
    public Long sumOrderTotalByCustomerAndDateRange(LocalDateTime startDate , LocalDateTime endDate, Long customerId) {
        JPQLQuery<Long> query = from(order)
                .join(order.orderProducts, orderProduct)
                .join(order.member, member)
                .join(member.memberCustomers, memberCustomer)
                .join(memberCustomer.customer, customer)
                .where(customer.customerId.eq(customerId)
                        .and(order.createdAt.between(startDate, endDate))
                        .and(order.orderStatus.eq(OrderStatus.APPROVED))
                        .and(orderProduct.orderProductStatus.eq(OrderProductStatus.APPROVED)))
                .select(orderProduct.price.multiply(
                                Expressions.asNumber(1).subtract(orderProduct.discount.divide(100.0)))
                        .multiply(orderProduct.quantity).sum().longValue());

        return query.fetchOne() != null ? query.fetchOne() : Long.valueOf(0L);
    }
}