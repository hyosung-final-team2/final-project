package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import lombok.Getter;

@Getter
public class MemberDetailPaymentMethodRequest {
    private Long paymentMethodId;
    private String accountNumber;
    private String bankName;
    private String cardCompanyName;
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
