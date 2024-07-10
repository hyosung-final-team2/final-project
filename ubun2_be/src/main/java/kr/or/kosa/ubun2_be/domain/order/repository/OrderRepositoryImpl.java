package kr.or.kosa.ubun2_be.domain.order.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPQLQuery;
import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;
import java.util.Optional;

import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMemberCustomer.memberCustomer;
import static kr.or.kosa.ubun2_be.domain.order.entity.QOrder.order;
import static kr.or.kosa.ubun2_be.domain.order.entity.QOrderProduct.orderProduct;
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
}