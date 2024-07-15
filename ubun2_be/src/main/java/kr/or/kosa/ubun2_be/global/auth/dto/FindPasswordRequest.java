package kr.or.kosa.ubun2_be.global.auth.dto;

import lombok.Getter;

@Getter
public class FindPasswordRequest {
    private String userName;
    private String userEmail;
    private String userLoginId;
    private String role;
}
