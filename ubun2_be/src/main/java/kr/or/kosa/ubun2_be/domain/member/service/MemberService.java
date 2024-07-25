package kr.or.kosa.ubun2_be.domain.member.service;

import kr.or.kosa.ubun2_be.domain.member.dto.*;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;

import java.util.List;

public interface MemberService {
    void createMember(MemberSignUpRequest memberSignUpRequest);

    List<CustomerResponse> getCustomers(Long memberId);

    boolean isExistMemberCustomer(Long memberId, Long customerId);

    AnnouncementResponse getAnnouncement(Long customerId, Long memberId);
    Member findById(Long memberId);

    void updateMemberFcmToken(Long memberId, FcmTokenRequest fcmTokenRequest);

    boolean simpleCheck(Long memberId, PaymentPasswordRequest request);

    void registerSimplePassword(Long memberId, PaymentPasswordRequest request);

    void updateSimplePassword(Long memberId, PaymentPasswordRequest request);

    MemberInfoResponse memberInfo(Long memberId);
}
