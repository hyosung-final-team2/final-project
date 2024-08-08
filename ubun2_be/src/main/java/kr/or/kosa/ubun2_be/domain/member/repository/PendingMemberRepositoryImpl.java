package kr.or.kosa.ubun2_be.domain.member.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.StringPath;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.ArrayList;
import java.util.List;

import static kr.or.kosa.ubun2_be.domain.member.entity.QPendingMember.pendingMember;


public class PendingMemberRepositoryImpl extends QuerydslRepositorySupport implements PendingMemberRepositoryCustom {

    private static final List<String> STRING_SEARCH_FIELDS = List.of("memberEmail", "memberName", "memberPhone");

    public PendingMemberRepositoryImpl() {
        super(Product.class);
    }

    @Override
    public List<PendingMember> findPendingMembersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest) {
        if (("createdAt").equals(searchRequest.getSearchCategory()) && searchRequest.getSearchKeyword() != null)
            return new ArrayList<>();
        return from(pendingMember)
                .where(pendingMember.customer.customerId.eq(customerId), pendingMemberSearch(searchRequest))
                .fetch();
    }

    private BooleanBuilder pendingMemberSearch(SearchRequest searchRequest) {
        BooleanBuilder builder = new BooleanBuilder();
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
        }
        return builder;
    }


    private ComparableExpressionBase<?> getPath(String property) {
        return switch (property) {
            case "memberEmail" -> pendingMember.pendingMemberEmail;
            case "memberName" -> pendingMember.pendingMemberName;
            case "memberPhone" -> pendingMember.pendingMemberPhone;
            default -> null;
        };
    }
}
