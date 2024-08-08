package kr.or.kosa.ubun2_be.domain.financial.institution.service;

import kr.or.kosa.ubun2_be.domain.financial.institution.entity.Bank;
import kr.or.kosa.ubun2_be.domain.financial.institution.repository.BankRepository;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodException;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodExceptionType;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.AccountPaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BankService {
    private final BankRepository bankRepository;
    private final AccountPaymentRepository accountPaymentRepository;

    public Bank getAccount(PaymentMethod paymentMethod, String memberName) {
        AccountPayment accountPayment = accountPaymentRepository.findById(paymentMethod.getPaymentMethodId())
                .orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.INVALID_ACCOUNT_INFO));

        return bankRepository.findByAccountNumberAndUserNameAndAccountStatusTrue(
                        accountPayment.getAccountNumber(), memberName)
                .orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.INVALID_ACCOUNT_INFO));
    }
}
