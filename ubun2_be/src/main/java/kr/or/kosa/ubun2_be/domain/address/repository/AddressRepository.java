package kr.or.kosa.ubun2_be.domain.address.repository;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Long>, AddressRepositoryCustom {
    List<Address> findByMemberMemberId(Long memberId);
}
