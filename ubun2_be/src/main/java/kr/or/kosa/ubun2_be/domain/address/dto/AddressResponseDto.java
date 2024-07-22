package kr.or.kosa.ubun2_be.domain.address.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddressResponseDto {
    private Long addressId;
    private String address;
}