package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import lombok.Getter;

@Getter
public class MemberDetailPaymentMethodRequest {

    @NotNull(message = "paymentMethodId는 필수값입니다.")
    @Positive
    private Long paymentMethodId;

    @Pattern(regexp = "^\\d{3,6}-?\\d{2,6}-?\\d{3,6}$", message = "계좌번호 정규식 (예: 11~14자리 숫자, 대시 허용)")
    private String accountNumber;

    private String bankName;

    private String cardCompanyName;

    @Pattern(regexp = "^(\\d{4}[-\\s]?){3}\\d{4}$", message = "카드 번호 정규식 (예: 16자리 숫자, 4자리마다 공백 또는 대시 허용")
    private String cardNumber;

    public AccountPayment toAccountPaymentEntity(Member member) {
        return AccountPayment.builder()
                .member(member)
                .accountNumber(accountNumber)
                .bankName(bankName)
                .build();

    }

    public CardPayment toCardPaymentEntity(Member member) {
        return CardPayment.builder()
                .member(member)
                .cardNumber(cardNumber)
                .cardCompanyName(cardCompanyName)
                .build();

    }

}
