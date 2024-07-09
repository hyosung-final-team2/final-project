package kr.or.kosa.ubun2_be.domain.address.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AddressRequest {
    private Long memberId;
    private Long addressId;
    private String address;
    private String recipientName;
    private String recipientPhone;
}