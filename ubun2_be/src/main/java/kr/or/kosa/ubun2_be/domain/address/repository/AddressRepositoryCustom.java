package kr.or.kosa.ubun2_be.domain.address.repository;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface AddressRepositoryCustom {
    Page<Address> findAllAddressesWithMember(Pageable pageable, Long customerId);
    Optional<Address> findAddressByIdAndCustomerId(Long addressId, Long customerId);
}
