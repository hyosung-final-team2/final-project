package kr.or.kosa.ubun2_be.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Entity
@Getter
@Table(name = "account_payment")
public class AccountPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long accountPaymentId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod;

    @Column(nullable = false)
    private String accountNumber;

    @Column(nullable = false, length = 4)
    private String accountPassword;

    @Column(nullable = false)
    private String bankName;

}
