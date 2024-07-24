package kr.or.kosa.ubun2_be.domain.order.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.JPQLQuery;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static kr.or.kosa.ubun2_be.domain.customer.entity.QCustomer.customer;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMemberCustomer.memberCustomer;
import static kr.or.kosa.ubun2_be.domain.order.entity.QOrder.order;
import static kr.or.kosa.ubun2_be.domain.order.entity.QOrderProduct.orderProduct;
import static kr.or.kosa.ubun2_be.domain.product.entity.QProduct.product;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QAccountPayment.accountPayment;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QCardPayment.cardPayment;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QPaymentMethod.paymentMethod;

public class OrderRepositoryImpl extends QuerydslRepositorySupport implements OrderRepositoryCustom {

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
        BooleanBuilder builder = new BooleanBuilder();
        if (searchRequest != null && searchRequest.getSearchKeyword() != null) {
            String category = searchRequest.getSearchCategory().toLowerCase();
            String keyword = searchRequest.getSearchKeyword();
            switch (category) {
                case "membername":
                    builder.and(order.member.memberName.containsIgnoreCase(keyword));
                    break;
                case "orderstatus":
                    builder.and(order.orderStatus.stringValue().containsIgnoreCase(keyword));
                    break;
            }
        }
        return builder;
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
                        .and(order.orderStatus.ne(OrderStatus.APPROVED)))
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
        return from(order)
                .select(order.address)
                .join(order.orderProducts, orderProduct)
                .join(orderProduct.product.customer, customer)
                .where(customer.customerId.eq(customerId)
                        .and(order.createdAt.between(startDate, endDate))
                        .and(order.orderStatus.eq(OrderStatus.APPROVED)))
                .fetch();
    }
}