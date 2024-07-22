package kr.or.kosa.ubun2_be.domain.dashboard.dto;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AddressesResponse {
    private String addressName;
    private Long addressId;

    public static AddressesResponse of(Address address) {

        return AddressesResponse.builder()
                .addressName(address.getAddress())
                .addressId(address.getAddressId())
                .build();
    }
}
