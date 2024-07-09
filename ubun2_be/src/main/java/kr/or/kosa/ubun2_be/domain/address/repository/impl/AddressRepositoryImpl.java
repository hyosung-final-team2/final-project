package kr.or.kosa.ubun2_be.domain.address.repository.impl;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.JPQLQuery;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressResponseDto;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressMemberInfoResponse;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressResponse;
import kr.or.kosa.ubun2_be.domain.address.entity.QAddress;
import kr.or.kosa.ubun2_be.domain.address.repository.AddressRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;

import java.util.List;

import static kr.or.kosa.ubun2_be.domain.address.entity.QAddress.address1;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;


@Repository
public class AddressRepositoryImpl extends QuerydslRepositorySupport implements AddressRepositoryCustom {

    public AddressRepositoryImpl() {
        super(Address.class);
    }
    @Override
    public Page<AddressResponse> findAllAddressesWithMember(Pageable pageable) {
        QAddress address = new QAddress("address");
        JPQLQuery<AddressResponse> query = from(address)
                .join(address.member, member)
                .select(Projections.constructor(AddressResponse.class,
                        address.addressId,
                        member.memberEmail,
                        member.memberName,
                        address.address,
                        address.addressNickname,
                        address.recipientName,
                        address.recipientPhone,
                        address.defaultStatus));

        long total = query.fetchCount();

        List<AddressResponse> content = getQuerydsl().applyPagination(pageable, query).fetch();

        return new PageImpl<>(content, pageable, total);
    }
    @Override
    public AddressMemberInfoResponse findMemberInfoByAddressId(Long addressId) {

        Tuple memberInfo = from(address1)
                .join(address1.member, member)
                .where(address1.addressId.eq(addressId))
                .select(member.memberName, member.memberPhone, member.memberEmail, member.createdAt)
                .fetchOne();

        if (memberInfo == null) {
            return null;
        }

        // 해당 회원의 모든 주소 목록 조회
        List<AddressResponseDto> addresses = from(address1)
                .where(address1.member.memberId.eq(
                        JPAExpressions.select(address1.member.memberId)
                                .from(address1)
                                .where(address1.addressId.eq(addressId))
                ))
                .select(Projections.constructor(AddressResponseDto.class,
                        address1.addressId,
                        address1.address))
                .fetch();


        // 결과 조합
        return AddressMemberInfoResponse.builder()
                .memberName(memberInfo.get(member.memberName))
                .memberPhone(memberInfo.get(member.memberPhone))
                .memberEmail(memberInfo.get(member.memberEmail))
                .registrationDate(memberInfo.get(member.createdAt))
                .addresses(addresses)
                .build();

    }
}