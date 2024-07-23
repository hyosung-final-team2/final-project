package kr.or.kosa.ubun2_be.domain.address.service;

import kr.or.kosa.ubun2_be.domain.address.dto.AddressMemberInfoResponse;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressRequest;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressResponse;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.member.dto.MyAddressResponse;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface AddressService {
    public Page<AddressResponse> getAllAddresses(Pageable pageable, SearchRequest searchRequest, Long customerId);

    public AddressMemberInfoResponse getMemberInfoByAddressId(Long addressId, Long customerId);

    public void addAddress(AddressRequest addressRequest, Long customerId);

    public void updateAddress(Long addressId, AddressRequest addressRequest, Long customerId);

    public void deleteAddress(Long addressId, Long customerId);

    public List<MyAddressResponse> getAddressesByMemberId(Long memberId);

    public void addMemberAddress(AddressRequest addressRequest, Long memberId);

    public void updateMemberAddress(Long addressId, AddressRequest addressRequest, Long memberId);

    Address findByAddressIdAndMemberId(Long addressId, Long memberId);

    public void deleteMemberAddress(Long addressId, Long memberId);
}