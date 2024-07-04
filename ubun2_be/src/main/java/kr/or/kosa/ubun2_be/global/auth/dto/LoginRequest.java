package kr.or.kosa.ubun2_be.global.auth.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
public class LoginRequest {
    private String userType; // "ROLE_CUSTOMER" or "ROLE_MEMBER"
    private String loginId;
    private String password;
}
