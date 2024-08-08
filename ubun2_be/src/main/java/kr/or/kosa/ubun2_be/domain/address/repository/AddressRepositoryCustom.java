package kr.or.kosa.ubun2_be.domain.address.repository;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

public interface AddressRepositoryCustom {
    Page<Address> findAllAddressesWithMember(Pageable pageable, SearchRequest searchRequest, Long customerId);

    Optional<Address> findAddressByIdAndCustomerId(Long addressId, Long customerId);

    boolean checkIsMyMember(Long customerId, Long memberId);
}
