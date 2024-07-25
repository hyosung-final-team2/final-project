package kr.or.kosa.ubun2_be.domain.address.repository.impl;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.StringPath;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.address.repository.AddressRepositoryCustom;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static kr.or.kosa.ubun2_be.domain.address.entity.QAddress.address1;
import static kr.or.kosa.ubun2_be.domain.customer.entity.QCustomer.customer;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMemberCustomer.memberCustomer;


@Repository
public class AddressRepositoryImpl extends QuerydslRepositorySupport implements AddressRepositoryCustom {

    private static final List<String> STRING_SEARCH_FIELDS = List.of("memberName","address");

    public AddressRepositoryImpl() {
        super(Address.class);
    }
    @Override
    public Page<Address> findAllAddressesWithMember(Pageable pageable, SearchRequest searchRequest,Long customerId) {
        QueryResults<Address> results = from(address1)
                .join(address1.member, member)
                .join(member.memberCustomers, memberCustomer)
                .where(memberCustomer.customer.customerId.eq(customerId),addressSearch(searchRequest))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        List<Address> content = results.getResults();
        long total = results.getTotal();

        return new PageImpl<>(content, pageable, total);
    }
    private BooleanBuilder addressSearch(SearchRequest searchRequest) {
        if (searchRequest == null || searchRequest.getSearchCategory() == null  || searchRequest.getSearchKeyword() == null) {
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
        }

        return new BooleanBuilder();
    }
    private ComparableExpressionBase<?> getPath(String property) {
        return switch (property) {
            case "memberName" -> member.memberName;
            case "address" -> address1.address;
            default -> null;
        };
    }

    @Override
    public Optional<Address> findAddressByIdAndCustomerId(Long addressId, Long customerId) {
        Address result = from(address1)
                .join(address1.member, member)
                .join(member.memberCustomers, memberCustomer)
                .join(memberCustomer.customer, customer)
                .where(address1.addressId.eq(addressId)
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