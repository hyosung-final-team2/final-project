package kr.or.kosa.ubun2_be.domain.paymentmethod.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.SQLRestriction;

@Entity
@Getter
@DiscriminatorValue("ACCOUNT")
@Table(name = "account_payment")
@PrimaryKeyJoinColumn(name = "payment_method_id")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE account_payment SET is_deleted = true WHERE payment_method_id=?")
@SQLRestriction("is_deleted = false")
public class AccountPayment extends PaymentMethod {

    @Column(nullable = false)
    private String accountNumber;

    @Column(nullable = false)
    private String bankName;

    @Column
    @ColumnDefault("false")
    private boolean isDeleted;

    @Builder
    public AccountPayment(Member member,String accountNumber, String bankName) {
        super(member);
        this.accountNumber = accountNumber;
        this.bankName = bankName;
    }

    public void update(String accountNumber, String bankName) {
        this.accountNumber = accountNumber;
        this.bankName = bankName;
    }

}
