package kr.or.kosa.ubun2_be.global.auth.dto;

import lombok.Getter;

@Getter
public class EmailRequest {
    private String email;
    private String userType;
}
