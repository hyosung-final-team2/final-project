package kr.or.kosa.ubun2_be.domain.paymentmethod.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;

import lombok.*;

@Entity
@Getter
@DiscriminatorValue("ACCOUNT")
@Table(name = "account_payment")
@PrimaryKeyJoinColumn(name = "payment_method_id")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class AccountPayment extends PaymentMethod {

    @Column(nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    private String bankName;

    @Builder
    public AccountPayment(Member member, String paymentMethodNickname, String accountNumber, String bankName, boolean defaultStatus) {
        super(member, paymentMethodNickname, defaultStatus);
        this.accountNumber = accountNumber;
        this.bankName = bankName;
    }

}
