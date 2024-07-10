package kr.or.kosa.ubun2_be.domain.customer.dto.response;

import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
public class MemberListResponse {
    private Long memberId;
    private String memberEmail;
    private String memberName;
    private String memberPhone;
    private LocalDateTime createdAt;
    private boolean isPending;

    public MemberListResponse(Member member) {
        this.memberId = member.getMemberId();
        this.memberEmail = member.getMemberEmail();
        this.memberName = member.getMemberName();
        this.memberPhone = member.getMemberPhone();
        this.createdAt = member.getCreatedAt();
        this.isPending = false;
    }

    public MemberListResponse(PendingMember pendingMember) {
        this.memberId = pendingMember.getPendingMemberId();
        this.memberEmail = pendingMember.getPendingMemberEmail();
        this.memberName = pendingMember.getPendingMemberName();
        this.memberPhone = pendingMember.getPendingMemberPhone();
        this.createdAt = null;
        this.isPending = true;
    }
}
