package kr.or.kosa.ubun2_be.domain.customer.service;

import kr.or.kosa.ubun2_be.domain.customer.dto.*;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;

import java.util.Optional;

public interface CustomerService {
    Customer findById(Long customerId);

    void createCustomer(SignupRequest signupRequest);

    boolean isExistCustomerLoginId(String customerLoginId);

    void registerMember(RegisterMemberRequest registerMemberRequest, Long customerId);

    MemberDetailResponseWrapper<?> getMemberDetail(Long memberId, Boolean isPending);

}
