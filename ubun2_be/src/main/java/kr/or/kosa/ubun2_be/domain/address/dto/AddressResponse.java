package kr.or.kosa.ubun2_be.domain.address.dto;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressResponse {
    private Long addressId;
    private String memberEmail;
    private String memberName;
    private String address;

    public AddressResponse(Address address) {
        this.addressId = address.getAddressId();
        this.memberEmail = address.getMember().getMemberEmail();
        this.memberName = address.getMember().getMemberName();
        this.address = address.getAddress();
    }
}