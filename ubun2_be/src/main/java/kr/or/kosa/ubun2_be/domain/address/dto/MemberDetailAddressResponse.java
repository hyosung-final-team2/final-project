package kr.or.kosa.ubun2_be.domain.address.dto;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import lombok.Getter;

@Getter
public class MemberDetailAddressResponse {
    private Long addressId;
    private String address;

    public MemberDetailAddressResponse(Address address) {
        this.addressId = address.getAddressId();
        this.address = address.getAddress();
    }
}
