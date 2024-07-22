package kr.or.kosa.ubun2_be.domain.address.dto;

import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;
@Builder
@Getter
public class AddressMemberInfoResponse {
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private LocalDateTime registrationDate;
    private List<MemberDetailAddressResponse> addresses;

    public static AddressMemberInfoResponse of(Member member, List<MemberDetailAddressResponse> memberDetailAddressResponse) {
        return AddressMemberInfoResponse.builder()
                .memberName(member.getMemberName())
                .memberEmail(member.getMemberEmail())
                .memberPhone(member.getMemberPhone())
                .registrationDate(member.getCreatedAt())
                .addresses(memberDetailAddressResponse)
                .build();
    }

}