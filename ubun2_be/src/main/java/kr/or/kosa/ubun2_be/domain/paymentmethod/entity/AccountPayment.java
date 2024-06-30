package kr.or.kosa.ubun2_be.domain.paymentmethod.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@DiscriminatorValue("ACCOUNT")
@Table(name = "account_payment")
public class AccountPayment extends PaymentMethod {

    @Column(nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    private String bankName;

}
