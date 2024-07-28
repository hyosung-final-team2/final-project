package kr.or.kosa.ubun2_be.domain.address.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
public class AddressDeleteRequest {

    @NotNull(message = "addressId는 필수값입니다.")
    @Positive
    private Long addressId;
}
