package kr.or.kosa.ubun2_be.domain.member.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.DateTimePath;
import com.querydsl.core.types.dsl.StringPath;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;

import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMemberCustomer.memberCustomer;

public class MemberRepositoryImpl extends QuerydslRepositorySupport implements MemberRepositoryCustom {

    private static final DateTimeFormatter DATE_FORMATTER = DateTimeFormatter.ISO_LOCAL_DATE;
    private static final List<String> STRING_SEARCH_FIELDS = List.of("memberEmail","memberName","memberPhone");
    private static final List<String> DATE_SEARCH_FIELDS = List.of("createdAt");

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
        if (searchRequest == null ||searchRequest.getSearchCategory()==null|| searchRequest.getSearchKeyword() == null) {
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
        return builder;
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

    private ComparableExpressionBase<?> getPath(String property) {
        return switch (property) {
            case "memberEmail" -> member.memberEmail;
            case "memberName" -> member.memberName;
            case "memberPhone" -> member.memberPhone;
            case "createdAt" -> member.createdAt;
            default -> null;
        };
    }

}
