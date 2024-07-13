package kr.or.kosa.ubun2_be.domain.customer.service;

import kr.or.kosa.ubun2_be.domain.customer.dto.request.SmsRequest;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SmsService {
    ResponseEntity<String> sendSms(List<SmsRequest> nameAndPhoneNumbers, Long customerId);
}
