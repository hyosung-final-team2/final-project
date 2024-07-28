package kr.or.kosa.ubun2_be.domain.address.dto;

import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class SearchMemberListResponse {
    private Long memberId;
    private String memberEmail;
    private String memberName;
    private String memberPhone;
    private LocalDateTime createdAt;

    public SearchMemberListResponse(Member member) {
        this.memberId = member.getMemberId();
        this.memberEmail = member.getMemberEmail();
        this.memberName = member.getMemberName();
        this.memberPhone = member.getMemberPhone();
        this.createdAt = member.getCreatedAt();
    }

    public SearchMemberListResponse(PendingMember pendingMember) {
        this.memberId = pendingMember.getPendingMemberId();
        this.memberEmail = pendingMember.getPendingMemberEmail();
        this.memberName = pendingMember.getPendingMemberName();
        this.memberPhone = pendingMember.getPendingMemberPhone();
        this.createdAt = null;
    }
}
