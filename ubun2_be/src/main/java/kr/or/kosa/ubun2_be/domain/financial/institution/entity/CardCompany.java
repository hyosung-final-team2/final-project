package kr.or.kosa.ubun2_be.domain.financial.institution.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Entity
@Table(name = "card_company")
public class CardCompany {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long card_id;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false)
    private String cardCompanyName;

    @Column(nullable = false, length = 16)
    private String cardNumber;

    @Column(nullable = false)
    private String cardPassword;

    @Column(nullable = false)
    private String cvc;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

}
