package kr.or.kosa.ubun2_be.domain.address.service.impl;

import kr.or.kosa.ubun2_be.domain.address.dto.*;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.address.exception.AddressException;
import kr.or.kosa.ubun2_be.domain.address.exception.AddressExceptionType;
import kr.or.kosa.ubun2_be.domain.address.repository.AddressRepository;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import kr.or.kosa.ubun2_be.domain.member.dto.MyAddressResponse;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.domain.member.repository.PendingMemberRepository;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class AddressServiceImpl implements AddressService {

    private final AddressRepository addressRepository;

    private final MemberRepository memberRepository;

    private final PendingMemberRepository pendingMemberRepository;

    @Override
    public Page<AddressResponse> getAllAddresses(Pageable pageable, SearchRequest searchRequest, Long customerId) {
        return addressRepository.findAllAddressesWithMember(pageable,searchRequest, customerId).map(AddressResponse::new);
    }

    @Override
    public AddressMemberInfoResponse getMemberInfoByAddressId(Long addressId, Long customerId) {
        AddressMemberDetailRequest addressMemberDetailRequest = AddressMemberDetailRequest.builder()
                .addressId(addressId).build();
        Address address = addressRepository.findAddressByIdAndCustomerId(addressMemberDetailRequest.getAddressId(), customerId)
                .orElseThrow(()->new AddressException(AddressExceptionType.NOT_EXIST_ADDRESS));

        Member member = address.getMember();

        List<MemberDetailAddressResponse> addressDtos = member.getAddresses().stream()
                .map(MemberDetailAddressResponse::new)
                .toList();

        AddressMemberInfoResponse response = AddressMemberInfoResponse.of(member, addressDtos);

        if (response == null) {
            throw new AddressException(AddressExceptionType.NOT_EXIST_ADDRESS);
        }
        return response;
    }

    @Override
    public void addAddress(AddressRequest addressRequest, Long customerId) {
        validateMyMember(customerId, addressRequest.getMemberId());

        Member member = memberRepository.findById(addressRequest.getMemberId())
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));

        Address address = Address.builder()
                .member(member)
                .address(addressRequest.getAddress())
                .addressNickname(addressRequest.getAddressNickname()) //nullable?
                .recipientName(addressRequest.getRecipientName() != null ? addressRequest.getRecipientName() : member.getMemberName())
                .recipientPhone(addressRequest.getRecipientPhone() != null ? addressRequest.getRecipientPhone() : member.getMemberPhone())
                .defaultStatus(member.getAddresses().isEmpty()) // 첫 번째 주소면 기본 주소로 설정
                .build();

        addressRepository.save(address);
    }

    @Transactional
    @Override
    public void updateAddress(Long addressId, AddressRequest addressRequest, Long customerId) {
        validateMyMember(customerId, addressRequest.getMemberId());

        Address address = addressRepository.findById(addressId).orElse(null);
        address.updateAddress(addressRequest.getAddress());
    }

    @Transactional
    @Override
    public void deleteAddress(Long addressId, Long customerId) {
        Address address = addressRepository.findAddressByIdAndCustomerId(addressId, customerId)
                .orElseThrow(() -> new AddressException(AddressExceptionType.NOT_EXIST_ADDRESS));

        addressRepository.delete(address);
    }

    @Override
    public List<MyAddressResponse> getAddressesByMemberId(Long memberId) {
        List<Address> addresses = addressRepository.findByMemberMemberId(memberId);

        return addresses.stream()
                .map(MyAddressResponse::new)
                .toList();
    }

    @Transactional
    @Override
    public void addMemberAddress(MemberAddressRegisterRequest addressRequest, Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));

        Address address = Address.builder()
                .member(member)
                .address(addressRequest.getAddress())
                .addressNickname(addressRequest.getAddressNickname())
                .recipientName(addressRequest.getRecipientName())
                .recipientPhone(addressRequest.getRecipientPhone())
                .defaultStatus(member.getAddresses().isEmpty())
                .build();

        addressRepository.save(address);
    }

    @Transactional
    @Override
    public void updateMemberAddress(Long addressId, MemberAddressRegisterRequest addressRequest, Long memberId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new AddressException(AddressExceptionType.NOT_EXIST_ADDRESS));

        validateMyAddress(memberId, address);

        address.updateAddress(addressRequest.getAddress(), addressRequest.getAddressNickname(), addressRequest.getRecipientName(), addressRequest.getRecipientPhone());
    }

    @Transactional
    @Override
    public void deleteMemberAddress(Long addressId, Long memberId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new AddressException(AddressExceptionType.NOT_EXIST_ADDRESS));

        validateMyAddress(memberId, address);

        addressRepository.delete(address);
    }

    @Transactional
    @Override
    public void deleteSelectedAddress(List<AddressDeleteRequest> addressDeleteRequestList, Long customerId) {
        for (AddressDeleteRequest addressDeleteRequest : addressDeleteRequestList) {
            deleteAddress(addressDeleteRequest.getAddressId(), customerId);
        }
    }


    @Override
    public Address findByAddressIdAndMemberId(Long addressId, Long memberId) {
        return addressRepository.findByAddressIdAndMemberMemberId(addressId, memberId).orElseThrow(() -> new AddressException(AddressExceptionType.NOT_EXIST_ADDRESS));
    }

    @Override
    @Transactional
    public Page<SearchMemberListResponse> searchMemberList(Pageable pageable, SearchRequest searchRequest, Long customerId) {
        List<SearchMemberListResponse> memberListResponses = new ArrayList<>(memberRepository.findMembersByCustomerIdAndSearchRequest(customerId, searchRequest).stream().map(SearchMemberListResponse::new).toList());

        // 이름으로 정렬
        memberListResponses.sort(Comparator.comparing(SearchMemberListResponse::getMemberName));

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), memberListResponses.size());
        List<SearchMemberListResponse> paginatedList = memberListResponses.subList(start, end);

        return new PageImpl<>(paginatedList, pageable, memberListResponses.size());
    }

    @Override
    public List<MemberAddressListResponse> getMemberAddressList(Long memberId, Long customerId) {
        validateMyMember(customerId, memberId);

        List<Address> addresses = addressRepository.findByMemberMemberId(memberId);
        return addresses.stream()
                .map(MemberAddressListResponse::new)
                .toList();
    }

    @Transactional
    @Override
    public void setDefaultAddress(Long addressId, Long userId) {
        Address address = addressRepository.findById(addressId)
                .orElseThrow(() -> new AddressException(AddressExceptionType.NOT_EXIST_ADDRESS));

        Member member = address.getMember();
        List<Address> addresses = member.getAddresses();

        for (Address a : addresses) {
            if (Objects.equals(a.getAddressId(), addressId)) {
                a.updateDefaultStatus(true);
            } else {
                a.updateDefaultStatus(false);
            }
        }
    }

    private void validateMyMember(Long customerId, Long memberId) {
        if (!addressRepository.checkIsMyMember(customerId, memberId)) {
            throw new MemberException(MemberExceptionType.NOT_EXIST_MEMBER);
        }
    }

    private void validateMyAddress(Long memberId, Address address) {
        if (!Objects.equals(address.getMember().getMemberId(), memberId)) {
            throw new AddressException(AddressExceptionType.ADDRESS_NOT_MATCH);
        }
    }
}