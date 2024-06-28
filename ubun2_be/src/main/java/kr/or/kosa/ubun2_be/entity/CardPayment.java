package kr.or.kosa.ubun2_be.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Entity
@Getter
@Table(name = "card_payment")
public class CardPayment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cardPaymentId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "payment_method_id", nullable = false)
    private PaymentMethod paymentMethod;

    @Column(nullable = false)
    private String cardCompanyName;

    @Column(nullable = false, length = 16)
    private String cardNumber;

    @Column(nullable = false, length = 4)
    private String cardPassword;

    @Column(nullable = false, length = 3)
    private String cvc;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

}