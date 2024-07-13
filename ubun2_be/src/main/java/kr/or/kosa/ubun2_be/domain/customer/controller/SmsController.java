package kr.or.kosa.ubun2_be.domain.customer.controller;

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
@RequestMapping("/customers")
public class SmsController {

    private final SmsService smsService;

    @PostMapping("/sendsms")
    public ResponseEntity<String> sendSms(@RequestBody List<SmsRequest> NameAndPhoneNumbers,
                                          @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return smsService.sendSms(NameAndPhoneNumbers, customUserDetails.getUserId());
    }
}
