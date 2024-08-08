package kr.or.kosa.ubun2_be.global.auth.utils;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthException;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthExceptionType;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import org.springframework.stereotype.Component;

@Component
public class UserFactory {
    public CustomUserDetails createUserDetails(Long userId, String loginId, String role) {
        if (role.equals(UserRole.ROLE_CUSTOMER.name())) {
            return new CustomUserDetails(createCustomer(userId, loginId));
        } else if (role.equals(UserRole.ROLE_MEMBER.name())) {
            return new CustomUserDetails(createMember(userId, loginId));
        } else {
            throw new AuthException(AuthExceptionType.INVALID_JWT_PAYLOAD_ROLE);
        }
    }

    private Customer createCustomer(Long userId, String loginId) {
        return Customer.builder()
                .customerId(userId)
                .customerLoginId(loginId)
                .customerPassword("tempPassword")
                .userRole(UserRole.ROLE_CUSTOMER)
                .build();
    }

    private Member createMember(Long userId, String loginId) {
        return Member.builder()
                .memberId(userId)
                .memberLoginId(loginId)
                .memberPassword("tempPassword")
                .userRole(UserRole.ROLE_MEMBER)
                .build();
    }
}
