package kr.or.kosa.ubun2_be.domain.paymentmethod.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import lombok.*;

@Entity
@Getter
@AllArgsConstructor
@DiscriminatorValue("CARD")
@Table(name = "card_payment")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@PrimaryKeyJoinColumn(name = "payment_method_id")
public class CardPayment extends PaymentMethod {

    @Column(nullable = false)
    private String cardCompanyName;

    @Column(nullable = false, length = 16)
    private String cardNumber;

    @Builder
    public CardPayment(Member member, String paymentMethodNickname, String cardNumber, String cardCompanyName) {
        super(member, paymentMethodNickname);
        this.cardNumber = cardNumber;
        this.cardCompanyName = cardCompanyName;
    }

}