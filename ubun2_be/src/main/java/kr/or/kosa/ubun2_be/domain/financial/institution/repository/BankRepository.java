package kr.or.kosa.ubun2_be.domain.financial.institution.repository;

import kr.or.kosa.ubun2_be.domain.financial.institution.entity.Bank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BankRepository extends JpaRepository<Bank, Long> {
    Optional<Bank> findByAccountNumberAndUserNameAndAccountStatusTrue(String accountNumber, String userName);
}
