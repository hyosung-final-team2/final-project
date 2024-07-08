package kr.or.kosa.ubun2_be.domain.member.service;

import kr.or.kosa.ubun2_be.domain.member.dto.MemberSignUpRequest;

public interface MemberService {
    void createMember(MemberSignUpRequest memberSignUpRequest);
}
