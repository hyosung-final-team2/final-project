package kr.or.kosa.ubun2_be.domain.member.dto;

import lombok.Getter;
@Getter
public class EmailAuthenticationRequest {
    private String email;
    private String authenticationNumber;
}

