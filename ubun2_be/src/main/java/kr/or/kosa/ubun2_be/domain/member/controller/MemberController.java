package kr.or.kosa.ubun2_be.domain.member.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.member.dto.MemberSignUpRequest;
import kr.or.kosa.ubun2_be.domain.member.service.MemberService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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

}
