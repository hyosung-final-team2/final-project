package kr.or.kosa.ubun2_be.domain.member.service;

import kr.or.kosa.ubun2_be.domain.member.dto.CustomerResponse;
import kr.or.kosa.ubun2_be.domain.member.dto.MemberSignUpRequest;

import java.util.List;

public interface MemberService {
    void createMember(MemberSignUpRequest memberSignUpRequest);

    List<CustomerResponse> getCustomers(Long memberId);
    boolean isExistMemberCustomer(Long memberId, Long customerId) ;

}
