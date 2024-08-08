package kr.or.kosa.ubun2_be.domain.member.dto;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MyAddressResponse {
    private String address;
    private String recipientName;
    private String recipientPhone;
    private String addressNickname;
    private Long addressId;
    private boolean defaultStatus;

    public MyAddressResponse(Address address) {
        this.address = address.getAddress();
        this.recipientName = address.getRecipientName();
        this.recipientPhone = address.getRecipientPhone();
        this.addressNickname = address.getAddressNickname();
        this.defaultStatus = address.isDefaultStatus();
        this.addressId = address.getAddressId();
    }
}
