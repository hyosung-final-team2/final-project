package kr.or.kosa.ubun2_be.domain.address.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import lombok.Getter;

@Getter
public class MemberDetailAddressRequest {

    @NotNull(message = "addressId는 필수값입니다.")
    @Positive
    private Long addressId;

    @NotBlank(message = "주소지를 입력해주세요")
    private String address;

    public Address toEntity(Member member) {
            return Address.builder()
                    .member(member)
                    .address(this.address)
                    .build();
    }
}
