package kr.or.kosa.ubun2_be.domain.customer.service;

import kr.or.kosa.ubun2_be.domain.customer.dto.*;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;

public interface CustomerService {
    Customer findById(Long customerId);

    void createCustomer(SignupRequest signupRequest);

    boolean isExistCustomerLoginId(String customerLoginId);

    void registerMember(RegisterMemberRequest registerMemberRequest, Long customerId);

    MemberDetailResponse getMemberDetail(Long memberId, Boolean isPending);

    void updateMember(Long memberId, MemberRequestWrapper<?> memberRequestWrapper);
}
