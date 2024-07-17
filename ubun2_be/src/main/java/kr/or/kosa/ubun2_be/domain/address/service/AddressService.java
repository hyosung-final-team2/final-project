package kr.or.kosa.ubun2_be.domain.address.service;

import kr.or.kosa.ubun2_be.domain.address.dto.AddressMemberDetailRequest;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressMemberInfoResponse;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressRequest;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressResponse;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AddressService {
    public Page<AddressResponse> getAllAddresses(Pageable pageable, Long customerId);

    public AddressMemberInfoResponse getMemberInfoByAddressId(AddressMemberDetailRequest addressMemberDetailRequest, Long customerId);

    public void addAddress(AddressRequest addressRequest, Long customerId);

    public void updateAddress(Long addressId, AddressRequest addressRequest, Long customerId);

    public void deleteAddress(Long addressId, Long customerId);

    Address findByAddressIdAndMemberId(Long addressId, Long memberId);
}
