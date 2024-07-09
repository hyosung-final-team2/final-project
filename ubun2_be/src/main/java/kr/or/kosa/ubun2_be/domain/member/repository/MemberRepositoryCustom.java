package kr.or.kosa.ubun2_be.domain.member.repository;

import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;

import java.util.List;

public interface MemberRepositoryCustom {
    List<Member> findMembersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest);
}
