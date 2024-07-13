package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import lombok.Getter;

@Getter
public class SmsRequest {
    private String phoneNumber;
    private String memberName;
}
