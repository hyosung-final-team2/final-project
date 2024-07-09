package kr.or.kosa.ubun2_be.domain.address.dto;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddressResponse {
    private Long addressId;
    private String memberEmail;
    private String memberName;
    private String address;
    private String addressNickname;
    private String recipientName;
    private String recipientPhone;
    private boolean defaultStatus;

    public AddressResponse(Long addressId, String memberEmail, String memberName, String address,
                           String addressNickname, String recipientName, String recipientPhone, boolean defaultStatus) {
        this.addressId = addressId;
        this.memberEmail = memberEmail;
        this.memberName = memberName;
        this.address = address;
        this.addressNickname = addressNickname;
        this.recipientName = recipientName;
        this.recipientPhone = recipientPhone;
        this.defaultStatus = defaultStatus;
    }
}