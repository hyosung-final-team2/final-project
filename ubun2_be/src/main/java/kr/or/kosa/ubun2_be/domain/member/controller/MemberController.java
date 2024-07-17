package kr.or.kosa.ubun2_be.domain.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.member.dto.AnnouncementResponse;
import kr.or.kosa.ubun2_be.domain.member.dto.CustomerResponse;
import kr.or.kosa.ubun2_be.domain.member.dto.MemberSignUpRequest;
import kr.or.kosa.ubun2_be.domain.member.service.MemberService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {
    private final MemberService memberService;

    @Operation(summary = "회원 회원가입")
    @PostMapping("/signup")
    public ResponseDto<?> createMember(@RequestBody MemberSignUpRequest memberSignUpRequest) {
        memberService.createMember(memberSignUpRequest);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

    @Operation(summary = "등록 상점 조회")
    @GetMapping("/stores")
    public ResponseDto<?> getStores(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        List<CustomerResponse> customers = memberService.getCustomers(customUserDetails.getUserId());
        return ResponseDto.ok(customers, "정상출력 데이터");
    }

    @Operation(summary = "상점 공지사항 조회")
    @GetMapping("/announcement/{customer_id}")
    public ResponseDto<?> getAnnouncement(@PathVariable Long customer_id,
                                          @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        AnnouncementResponse announcementResponse = memberService.getAnnouncement(customer_id,customUserDetails.getUserId());
        return ResponseDto.ok(announcementResponse,"정상출력 데이터");
    }

}
