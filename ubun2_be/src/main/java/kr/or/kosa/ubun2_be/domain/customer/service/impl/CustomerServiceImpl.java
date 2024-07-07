package kr.or.kosa.ubun2_be.domain.customer.service.impl;


import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.customer.dto.*;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerExceptionType;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.entity.MemberCustomer;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.exception.pendingmember.PendingMemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.pendingmember.PendingMemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberCustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.domain.member.repository.PendingMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final MemberRepository memberRepository;
    private final PendingMemberRepository pendingMemberRepository;
    private final MemberCustomerRepository memberCustomerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Customer findById(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerException(CustomerExceptionType.NOT_EXIST_CUSTOMER));
    }

    @Override
    @Transactional
    public void createCustomer(SignupRequest signupRequest) {
        if (isExistCustomerLoginId(signupRequest.getCustomerLoginId())) {
            throw new CustomerException(CustomerExceptionType.DUPLICATE_CUSTOMER_LOGIN_ID);
        }
        customerRepository.save(signupRequest.toEntity(passwordEncoder));
    }

    @Override
    public boolean isExistCustomerLoginId(String customerLoginId) {
        return customerRepository.existsByCustomerLoginId(customerLoginId);
    }

    @Override
    public void registerMember(RegisterMemberRequest registerMemberRequest, Long customerId) {
        if (!validateRegisterRequest(registerMemberRequest)) {
            throw new CustomerException(CustomerExceptionType.INVALID_REGISTER_FORMAT);
        }
        Customer customer = findById(customerId);
        Optional<Member> memberOptional = memberRepository.findByMemberEmail(registerMemberRequest.getPendingMemberEmail());

        if (memberOptional.isPresent()) {
            // 1. 있으면 => 이미 서비스에 가입되어있는 회원이기에 바로 다대다 테이블에 등록
            memberCustomerRepository.save(MemberCustomer.createMemberCustomer(memberOptional.get(),customer));
        } else {
            // 2. 없으면 => 가입 대기중인 pendingMemberTable에 등록
            pendingMemberRepository.save(PendingMember.createPendingMember(registerMemberRequest,customer));
        }
    }

    @Override
    public MemberDetailResponseWrapper<?> getMemberDetail(Long memberId, Boolean isPending) {
        if (isPending) {
            PendingMember pendingMember = pendingMemberRepository.findById(memberId)
                    .orElseThrow(() -> new PendingMemberException(PendingMemberExceptionType.NOT_EXIST_PENDING_MEMBER));
            return new MemberDetailResponseWrapper<>(createPendingMemberDetailResponse(pendingMember));
        } else {
            Member member = memberRepository.findMemberWithPaymentMethodsById(memberId)
                    .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));
            return new MemberDetailResponseWrapper<>(createMemberDetailResponse(member));
        }
    }

    public boolean validateRegisterRequest(RegisterMemberRequest registerMemberRequest) {
        return !registerMemberRequest.getPendingMemberName().isEmpty() &&
                !registerMemberRequest.getPendingMemberEmail().isEmpty() &&
                !registerMemberRequest.getPendingMemberPhone().isEmpty();
    }

    private PendingMemberDetailResponse createPendingMemberDetailResponse(PendingMember pendingMember) {
        return PendingMemberDetailResponse.builder()
                .pendingMemberName(pendingMember.getPendingMemberName())
                .pendingMemberEmail(pendingMember.getPendingMemberEmail())
                .pendingMemberPhone(pendingMember.getPendingMemberPhone())
                .pendingMemberAddress(pendingMember.getPendingMemberAddress())
                .pendingMemberCardCompanyName(pendingMember.getPendingMemberCardCompanyName())
                .pendingMemberCardNumber(pendingMember.getPendingMemberCardNumber())
                .pendingMemberBankName(pendingMember.getPendingMemberBankName())
                .pendingMemberAccountNumber(pendingMember.getPendingMemberAccountNumber())
                .build();
    }

    private MemberDetailResponse createMemberDetailResponse(Member member) {
        return MemberDetailResponse.builder()
                .memberName(member.getMemberName())
                .memberEmail(member.getMemberEmail())
                .memberPhone(member.getMemberPhone())
                .createdAt(member.getCreatedAt())
                .addresses(Address.toDTOList(member.getAddresses()))
                .paymentMethods(member.getPaymentMethods())
                .build();
    }

}
