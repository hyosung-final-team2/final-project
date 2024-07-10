package kr.or.kosa.ubun2_be.domain.address.dto;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import lombok.Getter;

@Getter
public class AddressResponse {
    private Long addressId;
    private String memberEmail;
    private String memberName;
    private String address;
    private String addressNickname;
    private String recipientName;
    private String recipientPhone;
    private boolean defaultStatus;

    public AddressResponse(Address address) {
        this.addressId = address.getAddressId();
        this.address = address.getAddress();
        this.addressNickname = address.getAddressNickname();
        this.recipientName = address.getRecipientName();
        this.recipientPhone = address.getRecipientPhone();
        this.defaultStatus = address.isDefaultStatus();
        this.memberEmail = address.getMember().getMemberEmail();
        this.memberName = address.getMember().getMemberName();
    }
}