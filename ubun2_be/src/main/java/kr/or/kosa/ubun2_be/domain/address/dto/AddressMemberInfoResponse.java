package kr.or.kosa.ubun2_be.domain.address.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class AddressMemberInfoResponse {
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private LocalDateTime registrationDate;
    private List<AddressDto> addresses;
}