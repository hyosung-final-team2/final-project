package kr.or.kosa.ubun2_be.domain.customer.controller;

import jakarta.validation.Valid;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.SmsRequest;
import kr.or.kosa.ubun2_be.domain.customer.service.SmsService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customers")
public class SmsController {

    private final SmsService smsService;

    @PostMapping("/sms")
    public ResponseEntity<String> sendSms(@Valid @RequestBody List<SmsRequest> nameAndPhoneNumbers,
                                          @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return smsService.sendSms(nameAndPhoneNumbers, customUserDetails.getUserId());
    }
}
