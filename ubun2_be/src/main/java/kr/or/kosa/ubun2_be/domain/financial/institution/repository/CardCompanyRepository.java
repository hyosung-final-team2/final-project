package kr.or.kosa.ubun2_be.domain.financial.institution.repository;

import kr.or.kosa.ubun2_be.domain.financial.institution.entity.CardCompany;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.Optional;

public interface CardCompanyRepository extends JpaRepository<CardCompany, Long> {
    Optional<CardCompany> findByCardNumberAndUserNameAndExpiryDateAfter(String cardNumber, String userName, LocalDateTime expiryDate);
}
