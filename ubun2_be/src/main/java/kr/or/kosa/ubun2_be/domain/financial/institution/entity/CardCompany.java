package kr.or.kosa.ubun2_be.domain.financial.institution.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDateTime;

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
