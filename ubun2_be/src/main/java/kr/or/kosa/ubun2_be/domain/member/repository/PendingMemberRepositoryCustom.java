package kr.or.kosa.ubun2_be.domain.member.repository;

import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;

import java.util.List;

public interface PendingMemberRepositoryCustom {
    List<PendingMember> findPendingMembersByCustomerIdAndSearchRequest(Long customerId, SearchRequest searchRequest);
}
