package kr.or.kosa.ubun2_be.domain.address.service.impl;

import kr.or.kosa.ubun2_be.domain.address.dto.*;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.address.exception.AddressException;
import kr.or.kosa.ubun2_be.domain.address.exception.AddressExceptionType;
import kr.or.kosa.ubun2_be.domain.address.repository.AddressRepository;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    private final MemberRepository memberRepository;

    @Override
    public Page<AddressResponse> getAllAddresses(Pageable pageable) {
        return addressRepository.findAllAddressesWithMember(pageable);
    }

    @Override
    public AddressMemberInfoResponse getMemberInfoByAddressId(AddressMemberDetailRequest addressMemberDetailRequest) {
        AddressMemberInfoResponse response = addressRepository.findMemberInfoByAddressId(addressMemberDetailRequest.getAddressId());
        if (response == null) {
            throw new AddressException(AddressExceptionType.NOT_EXIST_ADDRESS);
        }
        return response;
    }

    @Override
    public void addAddress(AddressRequest addressRequest) {
        Member member = memberRepository.findById(addressRequest.getMemberId())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));

        Address address = Address.builder()
                .member(member)
                .address(addressRequest.getAddress())
                .addressNickname("") //nullable?
                .recipientName(addressRequest.getRecipientName() != null ? addressRequest.getRecipientName() : member.getMemberName())
                .recipientPhone(addressRequest.getRecipientPhone() != null ? addressRequest.getRecipientPhone() : member.getMemberPhone())
                .defaultStatus(member.getAddresses().isEmpty()) // 첫 번째 주소면 기본 주소로 설정
                .build();

        addressRepository.save(address);
    }

    @Transactional
    @Override
    public void updateAddress(Long addressId, AddressRequest addressRequest) {
        Address address = addressRepository.findById(addressId).orElse(null);
        address.updateAddress(addressRequest.getAddress());
    }

    @Override
    public void deleteAddress(Long addressId) {
        Address address = addressRepository.findById(addressId).orElse(null);
        addressRepository.delete(address);
    }
}