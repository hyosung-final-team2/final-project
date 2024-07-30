package kr.or.kosa.ubun2_be.domain.paymentmethod.service.impl;

import kr.or.kosa.ubun2_be.domain.financial.institution.entity.Bank;
import kr.or.kosa.ubun2_be.domain.financial.institution.entity.CardCompany;
import kr.or.kosa.ubun2_be.domain.financial.institution.repository.BankRepository;
import kr.or.kosa.ubun2_be.domain.financial.institution.repository.CardCompanyRepository;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.*;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.MyAccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.MyCardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.RegisterPaymentMethodRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodException;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodExceptionType;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.PaymentMethodRepository;
import kr.or.kosa.ubun2_be.domain.paymentmethod.service.PaymentMethodService;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentMethodServiceImpl implements PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;
    private final MemberRepository memberRepository;
    private final BankRepository bankRepository;
    private final CardCompanyRepository cardCompanyRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Page<CardPaymentResponse> getAllCardPaymentMethodsForMember(Pageable pageable, SearchRequest searchRequest, Long customerId) {
        return paymentMethodRepository.findAllCardPaymentMethodsByMemberId(pageable, searchRequest, customerId)
                .map(paymentMethod -> new CardPaymentResponse((CardPayment) paymentMethod));
    }

    @Override
    public Page<AccountPaymentResponse> getAllAccountPaymentMethodsForMember(Pageable pageable, SearchRequest searchRequest, Long customerId) {
        return paymentMethodRepository.findAllAccountPaymentMethodsByMemberId(pageable, searchRequest, customerId)
                .map(paymentMethod -> new AccountPaymentResponse((AccountPayment) paymentMethod));
    }

    @Override
    public PaymentMethodDetailResponse getPaymentMethodDetailByMemberId(Long paymentMethodId, Long customerId) {
        PaymentMethodDetailRequest request = PaymentMethodDetailRequest.builder().paymentMethodId(paymentMethodId).build();
        PaymentMethod paymentMethod = paymentMethodRepository.findPaymentMethodByPaymentMethodIdAndCustomerId(request.getPaymentMethodId(), customerId)
                .orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD));

        Member member = paymentMethod.getMember();

        List<MemberPaymentMethodsResponse> paymentMethods = member.getPaymentMethods().stream()
                .map(MemberPaymentMethodsResponse::from)
                .toList();

        PaymentMethodDetailResponse response = PaymentMethodDetailResponse.of(member, paymentMethods);

        if (response == null) {
            throw new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD);
        }

        return response;
    }

    @Override
    public void addPaymentMethod(PaymentMethodRequest paymentMethodRequest, Long customerId) {
        validateMyMember(customerId, paymentMethodRequest.getMemberId());

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

    @Override
    public void deletePaymentMethod(Long paymentMethodId, Long customerId) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId).orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD));
        paymentMethodRepository.delete(paymentMethod);
    }

    //    회원의 결제수단 기능
    @Override
    public List<MyCardPaymentResponse> getMyCardPaymentMethods(Long memberId) {
        List<PaymentMethod> results = paymentMethodRepository.findByMemberMemberId(memberId);
        return results.stream()
                .filter(pm -> pm instanceof CardPayment)
                .map(pm -> new MyCardPaymentResponse((CardPayment) pm))
                .toList();
    }

    @Override
    public List<MyAccountPaymentResponse> getMyAccountPaymentMethods(Long memberId) {
        List<PaymentMethod> results = paymentMethodRepository.findByMemberMemberId(memberId);
        return results.stream()
                .filter(pm -> pm instanceof AccountPayment)
                .map(pm -> new MyAccountPaymentResponse((AccountPayment) pm))
                .toList();
    }

    @Override
    public MyAccountPaymentResponse getMyAccountPaymentMethod(Long paymentMethodId, Long memberId) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId).orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD));
        validateMyPaymentMethod(paymentMethod, memberId);
        return paymentMethod instanceof AccountPayment accountPayment ? new MyAccountPaymentResponse(accountPayment) : null;
    }

    @Override
    public MyCardPaymentResponse getMyCardPaymentMethod(Long paymentMethodId, Long memberId) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId).orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD));
        validateMyPaymentMethod(paymentMethod, memberId);
        return paymentMethod instanceof CardPayment cardPayment ? new MyCardPaymentResponse(cardPayment) : null;
    }

    @Override
    public void registerPaymentMethod(RegisterPaymentMethodRequest registerPaymentMethodRequest, Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));

        boolean isFirstPaymentMethod = paymentMethodRepository.findByMemberMemberId(memberId).isEmpty();

        if ("CARD".equals(registerPaymentMethodRequest.getPaymentType())) {
            //결제수단 카드일때 검증
            if (registerPaymentMethodRequest.getCardNumber() == null || registerPaymentMethodRequest.getCardCompanyName() == null || registerPaymentMethodRequest.getCardPassword() == null || registerPaymentMethodRequest.getCvc() == null|| registerPaymentMethodRequest.getCardExpirationDate() == null) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_CARD_INFO);
            }
            //카드번호 16자리 숫자 정규식 검증
            if (!isValidCardNumber(registerPaymentMethodRequest.getCardNumber())) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_CARD_NUMBER);
            }

            // 카드 회사 엔티티에서 카드 정보 검증
            CardCompany card = cardCompanyRepository.findByCardNumber(
                            registerPaymentMethodRequest.getCardNumber())
                    .orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NO_MATCHING_CARD_NUMBER));

            // 카드사명 검증
            if(!registerPaymentMethodRequest.getCardCompanyName().equals(card.getCardCompanyName())) {
                throw new PaymentMethodException(PaymentMethodExceptionType.NO_MATCHING_CARD_COMPANY);
            }

            // 카드 비밀번호 검증
            if (!passwordEncoder.matches(registerPaymentMethodRequest.getCardPassword(), card.getCardPassword())) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_CARD_PASSWORD);
            }

            // CVC 검증
            if(!passwordEncoder.matches(registerPaymentMethodRequest.getCvc(), card.getCvc())) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_CVC);
            }

            // 만료일 형식 변환
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/yy");
            String formattedExpiryDate = card.getExpiryDate().format(formatter);

            if (!registerPaymentMethodRequest.getCardExpirationDate().equals(formattedExpiryDate)){
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_CARD_INFO);
            }

            // 만료일 검증
            if( card.getExpiryDate().isBefore(LocalDateTime.now())) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_CARD_INFO);
            }

            CardPayment cardPayment = CardPayment.builder()
                    .member(member)
                    .cardNumber(registerPaymentMethodRequest.getCardNumber())
                    .cardCompanyName(registerPaymentMethodRequest.getCardCompanyName())
                    .paymentMethodNickname(registerPaymentMethodRequest.getPaymentMethodNickname())
                    .defaultStatus(isFirstPaymentMethod) // 첫 번째 결제수단이면 기본값으로 설정
                    .build();
            paymentMethodRepository.save(cardPayment);

        } else if ("ACCOUNT".equals(registerPaymentMethodRequest.getPaymentType())) {
            //결제수단 계좌일때 검증
            if (registerPaymentMethodRequest.getAccountNumber() == null || registerPaymentMethodRequest.getBankName() == null) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_ACCOUNT_INFO);
            }
            //계좌번호 11~14자리 규식 검증
            if (!isValidAccountNumber(registerPaymentMethodRequest.getAccountNumber())) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_ACCOUNT_NUMBER);
            }

            Bank account = bankRepository.findByAccountNumber(registerPaymentMethodRequest.getAccountNumber())
                    .orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NO_MATCHING_ACCOUNT_NUMBER));

            // 은행명 검증
            if(!registerPaymentMethodRequest.getBankName().equals(account.getBankName())) {
                throw new PaymentMethodException(PaymentMethodExceptionType.NO_MATCHING_BANK);
            }

            // 계좌 비밀번호 검증
            if(!passwordEncoder.matches(registerPaymentMethodRequest.getAccountPassword(), account.getAccountPassword())) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_ACCOUNT_PASSWORD);
            }

            // 계좌 상태 검증
            if(!account.isAccountStatus()) {
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_ACCOUNT_STATUS);
            }


            AccountPayment accountPayment = AccountPayment.builder()
                    .member(member)
                    .accountNumber(registerPaymentMethodRequest.getAccountNumber())
                    .bankName(registerPaymentMethodRequest.getBankName())
                    .paymentMethodNickname(registerPaymentMethodRequest.getPaymentMethodNickname())
                    .defaultStatus(isFirstPaymentMethod) // 첫 번째 결제수단이면 기본값으로 설정
                    .build();
            paymentMethodRepository.save(accountPayment);

        } else {
            throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_PAYMENT_TYPE);
        }
    }

    @Override
    public void updatePaymentMethod(Long paymentMethodId, UpdatePaymentMethodRequest updatePaymentMethodRequest, Long memberId) {
        Optional<PaymentMethod> paymentMethodOpt = paymentMethodRepository.findById(paymentMethodId);
        if (paymentMethodOpt.isPresent()) {
            PaymentMethod paymentMethod = paymentMethodOpt.get();
            validateMyPaymentMethod(paymentMethod, memberId);
            paymentMethod.update(updatePaymentMethodRequest.getPaymentMethodNickname());
            paymentMethodRepository.save(paymentMethod);
        } else {
            throw new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD);
        }
    }

    @Override
    public void deleteMyPaymentMethod(Long paymentMethodId, Long memberId) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId).orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD));
        validateMyPaymentMethod(paymentMethod, memberId);
        paymentMethodRepository.delete(paymentMethod);
    }

    @Override
    public PaymentMethod findById(Long paymentMethodId) {
        return paymentMethodRepository.findById(paymentMethodId)
                .orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD));
    }

    @Override
    public List<MemberPaymentMethodsResponse> getMemberPaymentMethods(Long memberId, Long customerId) {
        validateMyMember(customerId, memberId);

        List<PaymentMethod> paymentMethods = paymentMethodRepository.findByMemberMemberId(memberId);
        return paymentMethods.stream()
                .map(MemberPaymentMethodsResponse::from)
                .toList();
    }

    public boolean existsByPaymentMethodIdAndMemberMemberId(Long paymentMethodId, Long memberId) {
        return paymentMethodRepository.existsByPaymentMethodIdAndMemberMemberId(paymentMethodId, memberId);
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
        if (!paymentMethodRepository.checkIsMyMember(customerId, memberId)) {
            throw new MemberException(MemberExceptionType.NOT_EXIST_MEMBER);
        }
    }

    private void validateMyPaymentMethod(PaymentMethod paymentMethod, Long memberId) {
        if (!Objects.equals(paymentMethod.getMember().getMemberId(), memberId)) {
            throw new PaymentMethodException(PaymentMethodExceptionType.PAYMENT_NOT_MATCH);
        }
    }

    @Override
    public boolean hasPaymentPassword(Long memberId) {
        Member member = memberRepository.findById(memberId).orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));
        return member.getPaymentPassword() != null;
    }

    @Transactional
    @Override
    public void deleteSelectedPaymentMethod(List<PaymentMethodDeleteRequest> paymentMethodDeleteRequestList, Long customerId) {
        for (PaymentMethodDeleteRequest paymentMethodDeleteRequest : paymentMethodDeleteRequestList) {
            deletePaymentMethod(paymentMethodDeleteRequest.getPaymentMethodId(), customerId);
        }
    }

    @Transactional
    @Override
    public void setDefaultPaymentMethod(Long paymentMethodId, Long userId) {
        PaymentMethod paymentMethod = paymentMethodRepository.findById(paymentMethodId).orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD));
        Member member = memberRepository.findById(userId).orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));
        List<PaymentMethod> paymentMethods = member.getPaymentMethods();
        for (PaymentMethod pm : paymentMethods) {
            pm.updateDefaultStatus(false);
        }
        paymentMethod.updateDefaultStatus(true);
    }
}