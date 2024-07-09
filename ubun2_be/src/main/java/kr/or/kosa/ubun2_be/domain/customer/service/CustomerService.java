package kr.or.kosa.ubun2_be.domain.customer.service;

import kr.or.kosa.ubun2_be.domain.customer.dto.request.MemberRequestWrapper;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.RegisterMemberRequest;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.SignupRequest;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MemberDetailResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MemberListResponse;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CustomerService {
    Customer findById(Long customerId);

    void createCustomer(SignupRequest signupRequest);

    boolean isExistCustomerLoginId(String customerLoginId);

    void registerMember(RegisterMemberRequest registerMemberRequest, Long customerId);

    MemberDetailResponse getMemberDetail(Long memberId, Boolean isPending);

    void updateMember(Long memberId, MemberRequestWrapper<?> memberRequestWrapper);

    void deleteMember(Long memberId, Boolean isPending);

    Page<MemberListResponse> getMembers(Long customerId, SearchRequest searchRequest, Pageable pageable);
}
