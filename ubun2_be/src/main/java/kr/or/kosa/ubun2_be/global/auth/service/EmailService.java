package kr.or.kosa.ubun2_be.global.auth.service;

import kr.or.kosa.ubun2_be.global.auth.dto.EmailAuthenticationRequest;
import kr.or.kosa.ubun2_be.global.auth.dto.EmailRequest;

public interface EmailService {
    void sendEmail(EmailRequest emailRequest);
    boolean validateAuthenticationNumber(EmailAuthenticationRequest emailAuthenticationRequest);
}
