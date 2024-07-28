package kr.or.kosa.ubun2_be.domain.address.dto;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import lombok.Getter;

@Getter
public class MemberAddressListResponse {
    private String address;
    private Long addressId;

    public MemberAddressListResponse(Address address) {
        this.address = address.getAddress();
        this.addressId = address.getAddressId();
    }
}
