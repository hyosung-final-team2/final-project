package kr.or.kosa.ubun2_be.domain.paymentmethod.service.impl;

import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberCustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.MemberPaymentMethodsResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodException;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodExceptionType;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.PaymentMethodRepository;
import kr.or.kosa.ubun2_be.domain.paymentmethod.service.PaymentMethodService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentMethodServiceImpl implements PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;
    private final MemberRepository memberRepository;
    private final MemberCustomerRepository memberCustomerRepository;

    @Override
    public Page<CardPaymentResponse> getAllCardPaymentMethodsForMember(Pageable pageable, Long customerId) {
        return paymentMethodRepository.findAllCardPaymentMethodsByMemberId(pageable, customerId)
                .map(paymentMethod -> new CardPaymentResponse((CardPayment) paymentMethod));
    }

    @Override
    public Page<AccountPaymentResponse> getAllAccountPaymentMethodsForMember(Pageable pageable, Long customerId) {
        return paymentMethodRepository.findAllAccountPaymentMethodsByMemberId(pageable,customerId)
                .map(paymentMethod -> new AccountPaymentResponse((AccountPayment) paymentMethod));
    }

    @Override
    public PaymentMethodDetailResponse getPaymentMethodDetailByMemberId(PaymentMethodDetailRequest request, Long customerId) {
        PaymentMethod paymentMethod = paymentMethodRepository.findPaymentMethodbyPaymentMethodIdAndCustomerId(request.getPaymentMethodId(),customerId)
                .orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD));

        Member member = paymentMethod.getMember();

        List<MemberPaymentMethodsResponse> paymentMethods = member.getPaymentMethods().stream()
                .map(MemberPaymentMethodsResponse::from)
                .toList();

        PaymentMethodDetailResponse response = PaymentMethodDetailResponse.of(member, paymentMethods);

        if(response == null){
            throw new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD);
        }

        return response;
    }

    @Override
    public void addPaymentMethod(PaymentMethodRequest paymentMethodRequest, Long customerId) {
        validateMyMember(customerId,paymentMethodRequest.getMemberId());

        Member member = memberRepository.findById(paymentMethodRequest.getMemberId()).orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));

        if ("CARD".equals(paymentMethodRequest.getPaymentType())) {
            //결제수단 카드일때 검증
            if (paymentMethodRequest.getCardNumber() == null || paymentMethodRequest.getCardCompanyName() == null) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_CARD_INFO);
            }
            //카드번호 16자리 숫자 정규식 검증
            if (!isValidCardNumber(paymentMethodRequest.getCardNumber())) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_CARD_NUMBER);
            }
            CardPayment cardPayment = CardPayment.builder()
                    .member(member)
                    .cardNumber(paymentMethodRequest.getCardNumber())
                    .cardCompanyName(paymentMethodRequest.getCardCompanyName())
                    .build();
            paymentMethodRepository.save(cardPayment);
        } else if ("ACCOUNT".equals(paymentMethodRequest.getPaymentType())) {
            //결제수단 계좌일때 검증
            if (paymentMethodRequest.getAccountNumber() == null || paymentMethodRequest.getBankName() == null) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_ACCOUNT_INFO);
            }
            //계좌번호 11~14자리 정규식 검증
            if (!isValidAccountNumber(paymentMethodRequest.getAccountNumber())) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_ACCOUNT_NUMBER);
            }
            AccountPayment accountPayment = AccountPayment.builder()
                    .member(member)
                    .accountNumber(paymentMethodRequest.getAccountNumber())
                    .bankName(paymentMethodRequest.getBankName())
                    .build();
            paymentMethodRepository.save(accountPayment);
        } else {
            throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_PAYMENT_TYPE);
        }
    }

    @Transactional
    @Override
    public void updatePaymentMethod(Long paymentMethodId, PaymentMethodRequest request, Long customerId) {
        validateMyMember(customerId,request.getMemberId());

        Optional<PaymentMethod> paymentMethodOpt = paymentMethodRepository.findById(paymentMethodId);

        if (paymentMethodOpt.isPresent()) {
            PaymentMethod paymentMethod = paymentMethodOpt.get();

            if (paymentMethod instanceof CardPayment cardPayment) {
                if (!isValidCardNumber(request.getCardNumber())) {
                    throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_CARD_NUMBER);
                }
                cardPayment.update(request.getCardCompanyName(), request.getCardNumber());
            } else if (paymentMethod instanceof AccountPayment accountPayment) {
                if (!isValidAccountNumber(request.getAccountNumber())) {
                    throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_ACCOUNT_NUMBER);
                }
                accountPayment.update(request.getBankName(), request.getAccountNumber());
            } else {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_PAYMENT_TYPE);
            }
        }
        else{
            throw new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD);
        }

    }

    @Override
    public void deletePaymentMethod(Long paymentMethodId, Long customerId) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId).orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD));
        paymentMethodRepository.delete(paymentMethod);
    }

    private boolean isValidCardNumber(String cardNumber) {
        // 카드 번호 정규식 (예: 16자리 숫자, 4자리마다 공백 또는 대시 허용)
        String regex = "^(\\d{4}[-\\s]?){3}\\d{4}$";
        return cardNumber != null && cardNumber.matches(regex);
    }

    private boolean isValidAccountNumber(String accountNumber) {
        // 계좌번호 정규식 (예: 11~14자리 숫자, 대시 허용)
        String regex = "^\\d{3,6}-?\\d{2,6}-?\\d{3,6}$";
        return accountNumber != null && accountNumber.matches(regex);
    }

    private void validateMyMember(Long customerId, Long memberId) {
        if (!memberCustomerRepository.existsByCustomerIdAndMemberId(customerId, memberId)) {
            throw new MemberException(MemberExceptionType.NOT_EXIST_MEMBER);
        }
    }
}