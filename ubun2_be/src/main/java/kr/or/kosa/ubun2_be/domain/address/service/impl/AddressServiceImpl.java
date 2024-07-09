package kr.or.kosa.ubun2_be.domain.address.service.impl;

import jakarta.persistence.EntityNotFoundException;
import kr.or.kosa.ubun2_be.domain.address.dto.*;
import kr.or.kosa.ubun2_be.domain.address.repository.AddressRepository;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    @Override
    public Page<AddressResponse> getAllAddresses(Pageable pageable) {
        return addressRepository.findAllAddressesWithMember(pageable);
    }

    @Override
    public AddressMemberInfoResponse getMemberInfoByAddressId(AddressMemberDetailRequest addressMemberDetailRequest) {
        AddressMemberInfoResponse response = addressRepository.findMemberInfoByAddressId(addressMemberDetailRequest.getAddressId());
        if (response == null) {
            throw new EntityNotFoundException("주소를 찾을 수 없습니다.");
        }
        return response;
    }
}