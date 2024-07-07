package kr.or.kosa.ubun2_be.domain.member.repository;

import kr.or.kosa.ubun2_be.domain.member.entity.MemberCustomer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberCustomerRepository extends JpaRepository<MemberCustomer,Long> {
}
