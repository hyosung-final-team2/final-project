package kr.or.kosa.ubun2_be.domain.customer.dto;

import lombok.Getter;

@Getter
public class LoginRequest {
    private String customerLoginId;
    private String customerPassword;
}
