package kr.or.kosa.ubun2_be.global.auth.service.impl;

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
    private final MemberRepository memberRepository;
    private final CustomerRepository customerRepository;

    @Transactional
    @Override
    public void sendEmail(EmailRequest emailRequest) {
        String email = emailRequest.getEmail();
        System.out.println("email = " + email);
        System.out.println("emailRequest = " + emailRequest.getUserType());
        System.out.println("isRegister = " + emailRequest.isRegister());
        //이메일 중복체크
        boolean isCustomerRole = UserRole.ROLE_CUSTOMER.toString().equals(emailRequest.getUserType());
        boolean isMemberRole = UserRole.ROLE_MEMBER.toString().equals(emailRequest.getUserType());

        if (emailRequest.isRegister()) {
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
