package kr.or.kosa.ubun2_be.domain.address.dto;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AddressResponse {
    private Long addressId;
    private String memberEmail;
    private String memberName;
    private String address;
    private String addressNickname;
    private String recipientName;
    private String recipientPhone;
    private boolean defaultStatus;
}