package kr.or.kosa.ubun2_be.domain.address.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddressRequest {
    private Long memberId;
    private Long addressId;
    private String address;
    private String recipientName;
    private String recipientPhone;
    private String addressNickname;
}