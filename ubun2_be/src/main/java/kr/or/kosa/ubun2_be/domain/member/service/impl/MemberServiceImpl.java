package kr.or.kosa.ubun2_be.domain.member.service.impl;

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

@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PendingMemberRepository pendingMemberRepository;
    private final MemberCustomerRepository memberCustomerRepository;
    private final PasswordEncoder passwordEncoder;

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
}