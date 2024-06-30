package kr.or.kosa.ubun2_be.domain.paymentmethod.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@DiscriminatorValue("CARD")
@Table(name = "card_payment")
public class CardPayment extends PaymentMethod {


    @Column(nullable = false)
    private String cardCompanyName;

    @Column(nullable = false, length = 16)
    private String cardNumber;

}