package kr.or.kosa.ubun2_be.domain.customer.service.impl;

import kr.or.kosa.ubun2_be.domain.customer.dto.request.SmsRequest;
import kr.or.kosa.ubun2_be.domain.customer.provider.SmsProvider;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.customer.service.SmsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SmsServiceImpl implements SmsService {

    private final SmsProvider smsProvider;
    private final CustomerRepository customerRepository;


    @Override
    public ResponseEntity<String> sendSms(List<SmsRequest> nameAndPhoneNumbers, Long customerId) {

        String businessName = customerRepository.findBusinessNameByCustomerId(customerId);

        try {
            boolean result = smsProvider.sendSms(nameAndPhoneNumbers,businessName);
            if (!result) ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("메시지 전송에 실패했습니다");
        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("메시지 전송 중 예외 발생");
        }
        return ResponseEntity.status(HttpStatus.OK).body("메시지 전송에 성공하였습니다.");
    }
}
