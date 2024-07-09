package kr.or.kosa.ubun2_be.domain.address.repository;

import kr.or.kosa.ubun2_be.domain.address.dto.AddressMemberInfoResponse;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressResponse;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AddressRepositoryCustom {
    Page<AddressResponse> findAllAddressesWithMember(Pageable pageable);
    AddressMemberInfoResponse findMemberInfoByAddressId(Long addressId);
}
