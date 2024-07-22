package kr.or.kosa.ubun2_be.domain.dashboard.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MemberCountResponseDto {
    private Long memberCount;
    private Long pendingMemberCount;

    public static MemberCountResponseDto of(Long memberCount, Long pendingMemberCount) {
        return new MemberCountResponseDto(memberCount, pendingMemberCount);
    }
}
