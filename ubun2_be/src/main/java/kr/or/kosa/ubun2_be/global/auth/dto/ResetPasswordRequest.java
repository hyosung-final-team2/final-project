package kr.or.kosa.ubun2_be.global.auth.dto;

import lombok.Getter;

@Getter
public class ResetPasswordRequest {
    private String userEmail;
    private String newPassword;
    private String role;
}

