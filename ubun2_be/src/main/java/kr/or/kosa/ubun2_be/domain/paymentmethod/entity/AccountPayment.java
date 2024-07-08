package kr.or.kosa.ubun2_be.domain.paymentmethod.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@DiscriminatorValue("ACCOUNT")
@Table(name = "account_payment")
@PrimaryKeyJoinColumn(name = "payment_method_id")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString
public class AccountPayment extends PaymentMethod {

    @Column(nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    private String bankName;

    @Builder
    public AccountPayment(Member member,String accountNumber, String bankName) {
        super(member);
        this.accountNumber = accountNumber;
        this.bankName = bankName;
    }


}
