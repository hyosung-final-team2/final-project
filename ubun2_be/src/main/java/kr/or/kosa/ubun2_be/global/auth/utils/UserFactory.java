package kr.or.kosa.ubun2_be.global.auth.utils;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthException;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthExceptionType;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;

public class UserFactory {
    public static CustomUserDetails createUserDetails(String loginId, String role) {
        if (role.equals(UserRole.ROLE_CUSTOMER.name())) {
            return new CustomUserDetails(createCustomer(loginId));
        } else if (role.equals(UserRole.ROLE_MEMBER.name())) {
            return new CustomUserDetails(createMember(loginId));
        } else {
            throw new AuthException(AuthExceptionType.INVALID_JWT_PAYLOAD_ROLE);
        }
    }

    private static Customer createCustomer(String loginId) {
        return Customer.builder()
                .customerLoginId(loginId)
                .customerPassword("tempPassword")
                .userRole(UserRole.ROLE_CUSTOMER)
                .build();
    }

    private static Member createMember(String loginId) {
        return Member.builder()
                .memberLoginId(loginId)
                .memberPassword("tempPassword")
                .userRole(UserRole.ROLE_MEMBER)
                .build();
    }

}
