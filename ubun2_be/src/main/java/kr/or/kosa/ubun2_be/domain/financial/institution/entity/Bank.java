package kr.or.kosa.ubun2_be.domain.financial.institution.entity;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "bank")
public class Bank {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bankId;

    @Column(nullable = false)
    private String bankName;

    @Column(nullable = false)
    private String userName;

    @Column(nullable = false, length = 16)
    private String accountNumber;

    @Column(nullable = false)
    private String accountPassword;

    @Column(nullable = false)
    private long balance;

    @Column(nullable = false)
    private boolean accountStatus;

    public void changeBalance(long newBalance) {
        this.balance = newBalance;
    }

}
