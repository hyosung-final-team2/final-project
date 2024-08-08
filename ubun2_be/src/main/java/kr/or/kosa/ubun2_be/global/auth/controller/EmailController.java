package kr.or.kosa.ubun2_be.global.auth.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import kr.or.kosa.ubun2_be.global.auth.dto.EmailAuthenticationRequest;
import kr.or.kosa.ubun2_be.global.auth.dto.EmailRequest;
import kr.or.kosa.ubun2_be.global.auth.service.EmailService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class EmailController {
    private final EmailService emailService;

    @Operation(summary = "인증번호 발송")
    @PostMapping("/auth/send")
    public ResponseDto<?> sendEmail(@Valid @RequestBody EmailRequest emailRequest) {
        emailService.sendEmail(emailRequest);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

    @Operation(summary = "인증번호 검증")
    @PostMapping("/auth")
    public ResponseDto<?> checkAuthenticationNumber(@Valid @RequestBody EmailAuthenticationRequest emailAuthenticationRequest) {
        boolean isValid = emailService.validateAuthenticationNumber(emailAuthenticationRequest);
        return ResponseDto.ok(isValid, "정상출력 데이터");
    }
}
