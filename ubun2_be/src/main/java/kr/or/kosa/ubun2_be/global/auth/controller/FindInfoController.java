package kr.or.kosa.ubun2_be.global.auth.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.global.auth.dto.FindIdRequest;
import kr.or.kosa.ubun2_be.global.auth.dto.FindIdResponse;
import kr.or.kosa.ubun2_be.global.auth.dto.FindPasswordRequest;
import kr.or.kosa.ubun2_be.global.auth.service.FindInfoService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class FindInfoController {

    private final FindInfoService findInfoService;

    @Operation(summary = "고객&회원 아이디 찾기")
    @PostMapping("/find/id")
    public ResponseDto<?> findId(@RequestBody FindIdRequest findIdRequest) {
        FindIdResponse findIdResponse = findInfoService.findId(findIdRequest.getUserName(),findIdRequest.getUserEmail(),findIdRequest.getRole());
        return ResponseDto.ok(findIdResponse,"아이디 찾기 성공");
    }

    @Operation(summary = "고객&회원 비밀번호 찾기")
    @PostMapping("find/password")
    public ResponseDto<?> findPassword(@RequestBody FindPasswordRequest findPasswordRequest) {
        findInfoService.findPassword(findPasswordRequest.getUserName(),findPasswordRequest.getUserEmail(),findPasswordRequest.getUserLoginId(),findPasswordRequest.getRole());
        return ResponseDto.ok(null,"비밀번호 재설정 허용");
    }
}
