package kr.or.kosa.ubun2_be.domain.member.dto;

import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import lombok.Getter;

@Getter
public class MemberSignUpRequest {
    private String memberLoginId;
    private String memberPassword;
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private String fcmToken;

    public Member toEntity(){
        return Member.builder().memberEmail(memberEmail)
                .memberLoginId(memberLoginId)
                .memberPassword(memberPassword)
                .memberName(memberName)
                .memberPhone(memberPhone)
                .fcmToken(fcmToken)
                .build();
    }
}
