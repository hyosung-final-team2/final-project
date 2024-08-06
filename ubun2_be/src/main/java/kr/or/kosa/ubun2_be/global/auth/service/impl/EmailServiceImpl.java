package kr.or.kosa.ubun2_be.global.auth.service.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerExceptionType;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.global.auth.dto.EmailAuthenticationRequest;
import kr.or.kosa.ubun2_be.global.auth.dto.EmailRequest;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthException;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthExceptionType;
import kr.or.kosa.ubun2_be.global.auth.service.EmailService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailServiceImpl implements EmailService {
    private static final long TIME_OUT = 3;
    private final RedisTemplate<String, Object> redisTemplate;
    private final JavaMailSender javaMailSender;
    private final MemberRepository memberRepository;
    private final CustomerRepository customerRepository;

    @Transactional
    @Override
    public void sendEmail(EmailRequest emailRequest) {
        String email = emailRequest.getEmail();
        //이메일 중복체크
        boolean isCustomerRole = UserRole.ROLE_CUSTOMER.toString().equals(emailRequest.getUserType());
        boolean isMemberRole = UserRole.ROLE_MEMBER.toString().equals(emailRequest.getUserType());

        if (emailRequest.getIsRegister().equals("YES")) {
            // 회원가입 시 중복 체크
            if (isCustomerRole && customerRepository.existsByCustomerEmail(email)) {
                throw new CustomerException(CustomerExceptionType.DUPLICATE_CUSTOMER);
            } else if (isMemberRole && memberRepository.existsByMemberEmail(email)) {
                throw new MemberException(MemberExceptionType.DUPLICATE_MEMBER);
            }
        } else {
            // 아이디/비밀번호 찾기 시 존재 여부 확인
            if (isCustomerRole && !customerRepository.existsByCustomerEmail(email)) {
                throw new CustomerException(CustomerExceptionType.NOT_EXIST_CUSTOMER);
            } else if (isMemberRole && !memberRepository.existsByMemberEmail(email)) {
                throw new MemberException(MemberExceptionType.NOT_EXIST_MEMBER);
            }
        }

        String authenticationNumber = generateAuthenticationNumber();
        saveAuthenticationNumber(email,authenticationNumber);

        try {
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(email);
            helper.setSubject("[ClickNBuy] 회원가입 이메일 인증");
            helper.setText(createEmailContent(authenticationNumber), true);

            javaMailSender.send(message);
        } catch (MessagingException e) {
            log.error("Failed to send email to {}", email, e);
            throw new AuthException(AuthExceptionType.EMAIL_SEND_FAILED);
        }
    }

    private String createEmailContent(String authenticationNumber) {
        return "<!DOCTYPE html>"
                + "<html lang='ko'>"
                + "<head>"
                + "<meta charset='UTF-8'>"
                + "<meta name='viewport' content='width=device-width, initial-scale=1.0'>"
                + "<title>ClickNBuy 이메일 인증</title>"
                + "<style>"
                + "body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }"
                + "h1 { color: #290386; }"
                + ".container { background-color: #f9f9f9; border-radius: 5px; padding: 20px; }"
                + ".verification-code { font-size: 24px; font-weight: bold; color: #290386; background-color: #928AFF; padding: 10px; border-radius: 5px; text-align: center; }"
                + ".footer { margin-top: 20px; font-size: 12px; color: #666; }"
                + "</style>"
                + "</head>"
                + "<body>"
                + "<div class='container'>"
                + "<h1>ClickNBuy 회원가입 인증</h1>"
                + "<p>안녕하세요, ClickNBuy 회원가입을 위한 이메일 인증번호입니다.</p>"
                + "<p>아래의 인증번호를 회원가입 페이지에 입력해 주세요:</p>"
                + "<p class='verification-code'>" + authenticationNumber + "</p>"
                + "<p>본 인증번호는 5분간 유효합니다.</p>"
                + "<p>감사합니다.</p>"
                + "<p><strong>ClickNBuy 팀</strong></p>"
                + "</div>"
                + "<div class='footer'>"
                + "<p>본 이메일은 발신 전용입니다. 문의사항이 있으시면 고객센터로 연락해 주세요.</p>"
                + "</div>"
                + "</body>"
                + "</html>";
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
