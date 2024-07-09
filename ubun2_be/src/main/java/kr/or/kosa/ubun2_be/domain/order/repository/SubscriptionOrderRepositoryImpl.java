package kr.or.kosa.ubun2_be.domain.order.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.JPQLQuery;
import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

import static kr.or.kosa.ubun2_be.domain.order.entity.QSubscriptionOrder.subscriptionOrder;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;
import static kr.or.kosa.ubun2_be.domain.order.entity.QSubscriptionOrderProduct.subscriptionOrderProduct;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QPaymentMethod.paymentMethod;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QAccountPayment.accountPayment;
import static kr.or.kosa.ubun2_be.domain.paymentmethod.entity.QCardPayment.cardPayment;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMemberCustomer.memberCustomer;

public class SubscriptionOrderRepositoryImpl extends QuerydslRepositorySupport implements SubscriptionOrderRepositoryCustom {

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

    private BooleanBuilder searchCondition(SearchRequest searchRequest) {
        BooleanBuilder builder = new BooleanBuilder();
        if (searchRequest != null && searchRequest.getSearchKeyword() != null) {
            String category = searchRequest.getSearchCategory().toLowerCase();
            String keyword = searchRequest.getSearchKeyword().toLowerCase();
            switch (category) {
                case "membername":
                    builder.and(subscriptionOrder.member.memberName.toLowerCase().contains(keyword));
                    break;
                case "orderstatus":
                    builder.and(subscriptionOrder.orderStatus.stringValue().toLowerCase().contains(keyword));
                    break;
            }
        }
        return builder;
    }
}