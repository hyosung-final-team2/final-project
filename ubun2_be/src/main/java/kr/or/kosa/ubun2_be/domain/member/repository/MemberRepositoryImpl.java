package kr.or.kosa.ubun2_be.domain.member.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.ArrayList;
import java.util.List;

import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMemberCustomer.memberCustomer;

public class MemberRepositoryImpl extends QuerydslRepositorySupport implements MemberRepositoryCustom {
    public MemberRepositoryImpl() {
        super(Member.class);
    }

    @Override
    public List<Member> findMembersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest) {
        return from(member)
                .join(member.memberCustomers, memberCustomer)
                .where(memberCustomer.customer.customerId.eq(customerId), memberSearch(searchRequest))
                .fetch();
    }

    private BooleanBuilder memberSearch(SearchRequest searchRequest) {
        BooleanBuilder builder = new BooleanBuilder();
        if (searchRequest != null && searchRequest.getSearchKeyword() != null) {
            builder.and(member.memberName.containsIgnoreCase(searchRequest.getSearchKeyword()));
        }
        return builder;
    }

    private List<OrderSpecifier<?>> memberSort(Pageable pageable) {
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
            case "memberEmail":
                return member.memberEmail;
            case "memberName":
                return member.memberName;
            case "memberPhone":
                return member.memberPhone;
            case "createdAt":
                return member.createdAt;
            default:
                return null;
        }
    }

}
