package kr.or.kosa.ubun2_be.global.auth.dto;

import lombok.Getter;

@Getter
public class CheckLoginIdRequest {
    private String userType; // "ROLE_CUSTOMER" or "ROLE_MEMBER"
    private String loginId;
}
