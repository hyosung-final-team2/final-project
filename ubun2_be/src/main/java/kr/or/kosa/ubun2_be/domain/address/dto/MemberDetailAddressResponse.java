package kr.or.kosa.ubun2_be.domain.address.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberDetailAddressResponse {
    private Long addressId;
    private String address;
}
