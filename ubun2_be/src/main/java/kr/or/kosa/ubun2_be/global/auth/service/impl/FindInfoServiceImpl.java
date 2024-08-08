package kr.or.kosa.ubun2_be.global.auth.service.impl;

import jakarta.transaction.Transactional;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerExceptionType;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.global.auth.dto.CheckLoginIdRequest;
import kr.or.kosa.ubun2_be.global.auth.dto.FindIdResponse;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthException;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthExceptionType;
import kr.or.kosa.ubun2_be.global.auth.service.FindInfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FindInfoServiceImpl implements FindInfoService {

    private final MemberRepository memberRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public FindIdResponse findId(String userName, String userEmail, String role) {
        if (role.equals("ROLE_CUSTOMER")) {
            return customerRepository.findByCustomerEmail(userEmail)
                    .filter(customer -> customer.getCustomerName().equals(userName))
                    .map(customer -> FindIdResponse.createFindId(customer.getCustomerLoginId()))
                    .orElseThrow(() -> new CustomerException(CustomerExceptionType.NOT_EXIST_CUSTOMER));
        } else if (role.equals("ROLE_MEMBER")) {
            return memberRepository.findByMemberEmail(userEmail)
                    .filter(member -> member.getMemberName().equals(userName))
                    .map(member -> FindIdResponse.createFindId(member.getMemberLoginId()))
                    .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));
        } else {
            throw new AuthException(AuthExceptionType.INVALID_LOGIN_ROLE);
        }
    }

    @Override
    public void findPassword(String userName, String userEmail, String userLoginId, String role) {
        if (role.equals("ROLE_CUSTOMER")) {
            customerRepository.findByCustomerEmail(userEmail)
                    .filter(customer -> customer.getCustomerName().equals(userName)
                            && customer.getCustomerLoginId().equals(userLoginId))
                    .orElseThrow(() -> new CustomerException(CustomerExceptionType.NOT_EXIST_CUSTOMER));
        } else if (role.equals("ROLE_MEMBER")) {
            memberRepository.findByMemberEmail(userEmail)
                    .filter(member -> member.getMemberName().equals(userName)
                            && member.getMemberLoginId().equals(userLoginId))
                    .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));
        } else {
            throw new AuthException(AuthExceptionType.INVALID_LOGIN_ROLE);
        }
    }

    @Transactional
    @Override
    public void resetPassword(String userEmail, String newPassword, String role) {
        if (role.equals("ROLE_CUSTOMER")) {
            customerRepository.findByCustomerEmail(userEmail).ifPresentOrElse(customer -> {
                if (passwordEncoder.matches(newPassword, customer.getCustomerPassword())) {
                    throw new AuthException(AuthExceptionType.SAME_AS_OLD_PASSWORD);
                }
                customer.updateCustomerPassword(passwordEncoder.encode(newPassword));
            }, () -> {
                throw new CustomerException(CustomerExceptionType.NOT_EXIST_CUSTOMER);
            });
        } else if (role.equals("ROLE_MEMBER")) {
            memberRepository.findByMemberEmail(userEmail).ifPresentOrElse(member -> {
                if (passwordEncoder.matches(newPassword, member.getMemberPassword())) {
                    throw new AuthException(AuthExceptionType.SAME_AS_OLD_PASSWORD);
                }
                member.updateMemberPassword(passwordEncoder.encode(newPassword));
            }, () -> {
                throw new MemberException(MemberExceptionType.NOT_EXIST_MEMBER);
            });
        } else {
            throw new AuthException(AuthExceptionType.INVALID_LOGIN_ROLE);
        }
    }

    public void checkLoginId(CheckLoginIdRequest checkLoginIdRequest) {
        if (checkLoginIdRequest.getUserType().equals(UserRole.ROLE_CUSTOMER.toString()) && customerRepository.existsByCustomerLoginId(checkLoginIdRequest.getLoginId())) { // Customer
            throw new CustomerException(CustomerExceptionType.DUPLICATE_CUSTOMER_LOGIN_ID);
        } else if (checkLoginIdRequest.getUserType().equals(UserRole.ROLE_MEMBER.toString()) && memberRepository.existsByMemberLoginId(checkLoginIdRequest.getLoginId())) {
            throw new MemberException(MemberExceptionType.DUPLICATE_MEMBER);
        }
    }
}
