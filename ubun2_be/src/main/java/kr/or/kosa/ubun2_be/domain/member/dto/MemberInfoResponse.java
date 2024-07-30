package kr.or.kosa.ubun2_be.domain.member.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class MemberInfoResponse {
    private String memberName;

    @Builder
    private MemberInfoResponse(String memberName) {
        this.memberName = memberName;
    }

    public static MemberInfoResponse of(String memberName) {
        return MemberInfoResponse.builder()
                .memberName(memberName)
                .build();
    }
}
