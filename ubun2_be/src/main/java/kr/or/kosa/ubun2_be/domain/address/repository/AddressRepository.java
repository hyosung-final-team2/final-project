package kr.or.kosa.ubun2_be.domain.address.repository;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

public interface AddressRepository extends JpaRepository<Address, Long>, AddressRepositoryCustom {
}
