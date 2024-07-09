package kr.or.kosa.ubun2_be.domain.member.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.ArrayList;
import java.util.List;

import static kr.or.kosa.ubun2_be.domain.member.entity.QPendingMember.pendingMember;


public class PendingMemberRepositoryImpl extends QuerydslRepositorySupport implements PendingMemberRepositoryCustom {
    public PendingMemberRepositoryImpl() {
        super(Product.class);
    }

    @Override
    public List<PendingMember> findPendingMembersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest) {
        return from(pendingMember)
                .where(pendingMember.customer.customerId.eq(customerId), pendingMemberSearch(searchRequest))
                .fetch();
    }

    private BooleanBuilder pendingMemberSearch(SearchRequest searchRequest) {
        BooleanBuilder builder = new BooleanBuilder();
        if (searchRequest != null && searchRequest.getSearchKeyword() != null) {
            builder.and(pendingMember.pendingMemberName.containsIgnoreCase(searchRequest.getSearchKeyword()));
        }
        return builder;
    }

    private List<OrderSpecifier<?>> pendingMemberSort(Pageable pageable) {
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

    private ComparableExpressionBase<?> getPath(String property) {
        switch (property) {
            case "pendingMemberEmail":
                return pendingMember.pendingMemberEmail;
            case "pendingMemberName":
                return pendingMember.pendingMemberName;
            case "pendingMemberPhone":
                return pendingMember.pendingMemberPhone;
            default:
                return null;
        }
    }
}
