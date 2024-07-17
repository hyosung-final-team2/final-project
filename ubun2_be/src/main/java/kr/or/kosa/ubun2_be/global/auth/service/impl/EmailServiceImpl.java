package kr.or.kosa.ubun2_be.global.auth.service.impl;

import kr.or.kosa.ubun2_be.global.auth.dto.EmailAuthenticationRequest;
import kr.or.kosa.ubun2_be.global.auth.dto.EmailRequest;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthException;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthExceptionType;
import kr.or.kosa.ubun2_be.global.auth.service.EmailService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
    private static final long TIME_OUT = 3;
    private final RedisTemplate<String, Object> redisTemplate;
    private final JavaMailSender javaMailSender;

    @Transactional
    @Override
    public void sendEmail(EmailRequest emailRequest) {
        String authenticationNumber = generateAuthenticationNumber();
        String email = emailRequest.getEmail();

        saveAuthenticationNumber(email,authenticationNumber);

        SimpleMailMessage mailMessage = new SimpleMailMessage();
        mailMessage.setSubject("인증메일");
        mailMessage.setText("인증번호: " + authenticationNumber);
        mailMessage.setTo(email);
        javaMailSender.send(mailMessage);
    }

    private String generateAuthenticationNumber() {
        Random random = new Random();
        int randomNumber = random.nextInt(900000) + 100000;
        return String.valueOf(randomNumber);
    }

    private void saveAuthenticationNumber(String email, String authenticationNumber) {
        ValueOperations<String, Object> stringObjectValueOperations = redisTemplate.opsForValue();
        stringObjectValueOperations.set(email, authenticationNumber);
        redisTemplate.expire(email, TIME_OUT, TimeUnit.MINUTES);
    }

    private void deleteAuthenticationNumber(String email) {
        redisTemplate.delete(email);
    }

    private Optional<String> getAuthenticationNumber(String email) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        String authenticationNumber = (String) valueOperations.get(email);
        return Optional.ofNullable(authenticationNumber);
    }

    @Transactional
    @Override
    public boolean validateAuthenticationNumber(EmailAuthenticationRequest emailAuthenticationRequest) {
        String authenticationNumber = getAuthenticationNumber(emailAuthenticationRequest.getEmail())
                                      .orElseThrow(()->new AuthException(AuthExceptionType.NO_EXIST_AUTH_NUMBER));
        if(authenticationNumber.equals(emailAuthenticationRequest.getAuthenticationNumber())) {
            deleteAuthenticationNumber(emailAuthenticationRequest.getEmail());
            return true;
        }
        //유효하지 않은 번호입니다 예외처리?
        return false;
    }
}
