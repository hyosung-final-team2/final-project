package kr.or.kosa.ubun2_be.domain.financial.institution.service;

import kr.or.kosa.ubun2_be.domain.financial.institution.repository.CardCompanyRepository;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodException;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodExceptionType;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.CardPaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class CardCompanyService {
    private final CardCompanyRepository cardCompanyRepository;
    private final CardPaymentRepository cardPaymentRepository;

    public void checkCardPayment(PaymentMethod paymentMethod, String memberName) {
        CardPayment cardPayment = cardPaymentRepository.findById(paymentMethod.getPaymentMethodId()).get();

        cardCompanyRepository.findByCardNumberAndUserNameAndExpiryDateAfter(
                        (cardPayment).getCardNumber(), memberName, LocalDateTime.now())
                .orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.INVALID_CARD_INFO));
    }
}
