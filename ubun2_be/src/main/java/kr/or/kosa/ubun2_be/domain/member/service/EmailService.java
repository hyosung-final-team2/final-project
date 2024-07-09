package kr.or.kosa.ubun2_be.domain.member.service;

import kr.or.kosa.ubun2_be.domain.member.dto.EmailAuthenticationRequest;
import kr.or.kosa.ubun2_be.domain.member.dto.EmailRequest;

public interface EmailService {
    void sendEmail(EmailRequest emailRequest);
    boolean validateAuthenticationNumber(EmailAuthenticationRequest emailAuthenticationRequest);
}
