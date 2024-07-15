package kr.or.kosa.ubun2_be.global.auth.dto;

import lombok.Getter;

@Getter
public class FindIdRequest {
    private String userName;
    private String userEmail;
    private String role;
}
