package kr.or.kosa.ubun2_be.domain.member.service.impl;

import kr.or.kosa.ubun2_be.domain.alarm.event.SubscribeAlarmEvent;
import kr.or.kosa.ubun2_be.domain.alarm.event.UnSubscribeAlarmEvent;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerExceptionType;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.dto.*;
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
import org.springframework.context.ApplicationEventPublisher;
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
    private final ApplicationEventPublisher eventPublisher;

    @Override
    @Transactional
    public void createMember(MemberSignUpRequest memberSignUpRequest) {
        if (memberRepository.existsByMemberEmail(memberSignUpRequest.getMemberEmail())) {
            throw new MemberException(MemberExceptionType.DUPLICATE_MEMBER);
        }
        Member savedMember = memberRepository.save(Member.builder().memberLoginId(memberSignUpRequest.getMemberLoginId())
                .memberName(memberSignUpRequest.getMemberName())
                .memberEmail(memberSignUpRequest.getMemberEmail())
                .memberPhone(memberSignUpRequest.getMemberPhone())
                .memberPassword(passwordEncoder.encode(memberSignUpRequest.getMemberPassword()))
                .fcmToken(memberSignUpRequest.getFcmToken())
                .userRole(UserRole.ROLE_MEMBER).build());

        List<PendingMember> findPendingMembers = pendingMemberRepository.findByPendingMemberEmail(memberSignUpRequest.getMemberEmail());
        if (findPendingMembers.isEmpty()) {
            return;
        }
        for (PendingMember findPendingMember : findPendingMembers) {
            memberCustomerRepository.save(MemberCustomer.createMemberCustomer(savedMember, findPendingMember.getCustomer()));
            eventPublisher.publishEvent(new SubscribeAlarmEvent(memberSignUpRequest.getFcmToken(), findPendingMember.getCustomer().getId()));
            pendingMemberRepository.delete(findPendingMember);
        }
    }

    @Override
    public List<CustomerResponse> getCustomers(Long memberId) {
        return customerRepository.findCustomersByMemberId(memberId).stream().map(CustomerResponse::new).toList();
    }

    public boolean isExistMemberCustomer(Long memberId, Long customerId) {
        if (memberCustomerRepository.existsByCustomerIdAndMemberId(customerId, memberId)) {
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
    public void updateMemberFcmToken(Long memberId, FcmTokenRequest fcmTokenRequest) {
        Member member = findById(memberId);
        if (member.getFcmToken().equals(fcmTokenRequest.getFcmToken())) {
            return;
        }

        List<MemberCustomer> memberCustomers = memberCustomerRepository.findByMemberIdFetchJoinCustomers(memberId);

        // 1. 원래 FcmToken으로 구독된거 다 끊어주고
        for (MemberCustomer memberCustomer : memberCustomers) {
            eventPublisher.publishEvent(new UnSubscribeAlarmEvent(member.getFcmToken(), memberCustomer.getCustomer().getCustomerId()));
        }
        // 2. FCM 토큰 업데이트 해주고
        member.updateMemberFcmToken(fcmTokenRequest.getFcmToken());

        // 3. 바뀐 토큰으로 다시 구독
        for (MemberCustomer memberCustomer : memberCustomers) {
            eventPublisher.publishEvent(new SubscribeAlarmEvent(member.getFcmToken(), memberCustomer.getCustomer().getCustomerId()));
        }

    }

    @Override
    public boolean simpleCheck(Long memberId, PaymentPasswordRequest request) {
        Member member = findById(memberId);
        return passwordEncoder.matches(request.getPaymentPassword(), member.getPaymentPassword());
    }

    @Override
    public void registerSimplePassword(Long memberId, PaymentPasswordRequest request) {
        Member member = findById(memberId);
        member.updatePaymentPassword(passwordEncoder.encode(request.getPaymentPassword()));
        memberRepository.save(member);
    }

    @Override
    public void updateSimplePassword(Long memberId, PaymentPasswordRequest request) {
        Member member = findById(memberId);
        member.updatePaymentPassword(passwordEncoder.encode(request.getPaymentPassword()));
    }

    @Override
    public MemberInfoResponse memberInfo(Long memberId) {
        Member member = findById(memberId);
        return MemberInfoResponse.of(member.getMemberName());
    }
}
