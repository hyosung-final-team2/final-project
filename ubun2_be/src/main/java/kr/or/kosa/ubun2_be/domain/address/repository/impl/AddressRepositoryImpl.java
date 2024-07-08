package kr.or.kosa.ubun2_be.domain.address.repository.impl;

import com.querydsl.core.types.Projections;
import com.querydsl.jpa.JPQLQuery;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressResponse;
import kr.or.kosa.ubun2_be.domain.address.entity.QAddress;
import kr.or.kosa.ubun2_be.domain.address.repository.AddressRepositoryCustom;
import kr.or.kosa.ubun2_be.domain.member.entity.QMember;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;


import java.util.List;


@Repository
public class AddressRepositoryImpl extends QuerydslRepositorySupport implements AddressRepositoryCustom {

    public AddressRepositoryImpl() {
        super(Address.class);
    }


    @Override
    public Page<AddressResponse> findAllAddressesWithMember(Pageable pageable) {
        QAddress address = new QAddress("address");
        QMember member = new QMember("member");

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
}