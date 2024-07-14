package kr.or.kosa.ubun2_be.domain.paymentmethod.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;


@Entity
@Getter
@AllArgsConstructor
@DiscriminatorValue("CARD")
@Table(name = "card_payment")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE card_payment SET is_deleted = true WHERE payment_method_id=?")
@SQLRestriction("is_deleted = false")
@PrimaryKeyJoinColumn(name = "payment_method_id")
public class CardPayment extends PaymentMethod {

    @Column(nullable = false)
    private String cardCompanyName;

    @Column(nullable = false, length = 16)
    private String cardNumber;

    @Column
    @ColumnDefault("false")
    private boolean isDeleted;

    @Builder
    public CardPayment(Member member,String cardNumber, String cardCompanyName) {
        super(member);
        this.cardNumber = cardNumber;
        this.cardCompanyName = cardCompanyName;
    }

    public void update(String cardNumber, String cardCompanyName) {
        this.cardCompanyName = cardCompanyName;
        this.cardNumber = cardNumber;
    }

}