package kr.or.kosa.ubun2_be.domain.address.service.impl;

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
    public AddressMemberInfoResponse getMemberAddressInfo(AddressMemberDetailRequest addressMemberDetailRequest) {
        Address address = addressRepository.findById(addressMemberDetailRequest.getAddressId()).orElse(null);

        if (address == null) {
            // 주소가 없을 때의 처리
//            throw new AddressNotFoundException("Address not found for ID: " + addressMemberDetailRequest.getAddressId());
        }

        Member member = address.getMember();

        List<AddressDto> addressDtos = member.getAddresses().stream()
                .map(this::convertToAddressDto)
                .collect(Collectors.toList());

        return AddressMemberInfoResponse.builder()
                .memberName(member.getMemberName())
                .memberPhone(member.getMemberPhone())
                .memberEmail(member.getMemberEmail())
                .registrationDate(member.getCreatedAt())
                .addresses(addressDtos)
                .build();

    }

    @Override
    public AddressResponse addAddress(AddressRequest addressRequest) {
        Member member = memberRepository.findById(addressRequest.getMemberId())
                .orElseThrow(() -> new EntityNotFoundException("해당하는 회원을 찾을 수 없습니다."));

        Address address = Address.builder()
                .member(member)
                .address(addressRequest.getAddress())
                .addressNickname("") //nullable?
                .recipientName(addressRequest.getRecipientName() != null ? addressRequest.getRecipientName() : member.getMemberName())
                .recipientPhone(addressRequest.getRecipientPhone() != null ? addressRequest.getRecipientPhone() : member.getMemberPhone())
                .defaultStatus(member.getAddresses().isEmpty()) // 첫 번째 주소면 기본 주소로 설정
                .build();

        Address savedAddress = addressRepository.save(address);
        return new AddressResponse(savedAddress);
    }
}