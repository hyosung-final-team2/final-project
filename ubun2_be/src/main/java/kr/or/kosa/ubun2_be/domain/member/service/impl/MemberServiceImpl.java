package kr.or.kosa.ubun2_be.domain.member.service.impl;

import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerExceptionType;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.dto.AnnouncementResponse;
import kr.or.kosa.ubun2_be.domain.member.dto.CustomerResponse;
import kr.or.kosa.ubun2_be.domain.member.dto.FcmTokenRequest;
import kr.or.kosa.ubun2_be.domain.member.dto.MemberSignUpRequest;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.entity.MemberCustomer;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberCustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.domain.member.repository.PendingMemberRepository;
import kr.or.kosa.ubun2_be.domain.member.service.MemberService;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PendingMemberRepository pendingMemberRepository;
    private final MemberCustomerRepository memberCustomerRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomerRepository customerRepository;

    @Override
    @Transactional
    public void createMember(MemberSignUpRequest memberSignUpRequest) {
        if(memberRepository.existsByMemberEmail(memberSignUpRequest.getMemberEmail())){
            throw new MemberException(MemberExceptionType.DUPLICATE_MEMBER);
        }
        Member savedMember = memberRepository.save(Member.builder().memberLoginId(memberSignUpRequest.getMemberLoginId())
                .memberName(memberSignUpRequest.getMemberName())
                .memberEmail(memberSignUpRequest.getMemberEmail())
                .memberPhone(memberSignUpRequest.getMemberPhone())
                .memberPassword(passwordEncoder.encode(memberSignUpRequest.getMemberPassword()))
                .userRole(UserRole.ROLE_MEMBER).build());

        List<PendingMember> findPendingMembers = pendingMemberRepository.findByPendingMemberEmail(memberSignUpRequest.getMemberEmail());
        if(findPendingMembers.isEmpty()){
            return;
        }
        for (PendingMember findPendingMember : findPendingMembers) {
            memberCustomerRepository.save(MemberCustomer.createMemberCustomer(savedMember,findPendingMember.getCustomer()));
            pendingMemberRepository.delete(findPendingMember);
        }
    }
    @Override
    public List<CustomerResponse> getCustomers(Long memberId) {
        return customerRepository.findCustomersByMemberId(memberId).stream().map(CustomerResponse::new).toList();
    }

    public boolean isExistMemberCustomer(Long memberId, Long customerId) {
        if(memberCustomerRepository.existsByCustomerIdAndMemberId(customerId,memberId)){
            return true;
        }
        throw new CustomerException(CustomerExceptionType.NOT_EXIST_CUSTOMER);
    }

    @Override
    public AnnouncementResponse getAnnouncement(Long customerId, Long memberId) {
        if (isExistMemberCustomer(memberId, customerId)) {
            Optional<String> announcement = customerRepository.findAnnouncementByCustomerId(customerId);
            if (announcement.isPresent()) {
                return AnnouncementResponse.builder()
                                           .announcement(announcement.get())
                                           .build();
            }
        }
        return AnnouncementResponse.builder()
                .announcement("등록된 공지사항이 없습니다.")
                .build();
    }

    @Override
    public Member findById(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));
    }

    @Override
    @Transactional
    public void updateFcmToken(Long memberId, FcmTokenRequest fcmTokenRequest) {
        Member member = findById(memberId);
        member.updateMemberFcmToken(fcmTokenRequest.getFcmToken());
    }
}
