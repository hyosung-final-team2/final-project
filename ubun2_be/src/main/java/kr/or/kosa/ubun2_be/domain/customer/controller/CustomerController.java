package kr.or.kosa.ubun2_be.domain.customer.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.customer.dto.*;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService customerService;

    @Operation(summary = "고객 회원가입")
    @PostMapping("/signup")
    public ResponseDto<?> signupCustomer(@RequestBody SignupRequest signupRequest) {
        customerService.createCustomer(signupRequest);
        return ResponseDto.ok(null, "고객 회원가입 정상 완료");
    }

    @Operation(summary = "고객 단일 등록")
    @PostMapping("/members")
    public ResponseDto<?> registerMember(@RequestBody RegisterMemberRequest registerMemberRequest) {
        Authentication currentCustomer = SecurityContextHolder.getContext().getAuthentication();
        customerService.registerMember(registerMemberRequest, Long.valueOf(currentCustomer.getName()));
        return ResponseDto.ok(null,"회원 등록 정상 완료");
    }

    @Operation(summary = "회원 & 가입대기회원 단일 상세조회")
    @GetMapping("/members/{memberId}")
    public ResponseDto<?> getMemberDetail(@PathVariable Long memberId, @RequestBody MemberDetailRequest memberDetailRequest) {
        MemberDetailResponse getMember = customerService.getMemberDetail(memberId, memberDetailRequest.getIsPending());
        return ResponseDto.ok(getMember,"회원 상세조회 정상 완료");
    }

    @Operation(summary = "회원 & 가입대기 회원 수정")
    @PutMapping("/members/{memberId}")
    public ResponseDto<?> updateMember(@PathVariable Long memberId, @RequestBody MemberRequestWrapper<?> memberRequestWrapper) {
        customerService.updateMember(memberId,memberRequestWrapper);
        return ResponseDto.ok(null,"회원 수정 정상 완료");
    }


}
