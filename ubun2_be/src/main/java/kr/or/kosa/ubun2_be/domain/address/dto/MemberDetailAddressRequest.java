package kr.or.kosa.ubun2_be.domain.address.dto;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import lombok.Getter;

@Getter
public class MemberDetailAddressRequest {
    private Long addressId;
    private String address;

    public Address toEntity(Member member) {
            return Address.builder()
                    .member(member)
                    .address(this.address)
                    .build();
    }
}
