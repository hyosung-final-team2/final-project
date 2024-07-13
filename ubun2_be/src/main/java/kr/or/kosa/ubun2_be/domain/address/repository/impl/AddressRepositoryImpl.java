package kr.or.kosa.ubun2_be.domain.address.repository.impl;

import com.querydsl.core.QueryResults;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.address.entity.QAddress;
import kr.or.kosa.ubun2_be.domain.address.repository.AddressRepositoryCustom;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import static kr.or.kosa.ubun2_be.domain.address.entity.QAddress.address1;
import static kr.or.kosa.ubun2_be.domain.customer.entity.QCustomer.customer;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMember.member;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMemberCustomer.memberCustomer;


@Repository
public class AddressRepositoryImpl extends QuerydslRepositorySupport implements AddressRepositoryCustom {

    public AddressRepositoryImpl() {
        super(Address.class);
    }
    @Override
    public Page<Address> findAllAddressesWithMember(Pageable pageable, Long customerId) {
        QAddress address = new QAddress("address");

        QueryResults<Address> results = from(address)
                .join(address.member, member)
                .join(member.memberCustomers, memberCustomer)
                .where(memberCustomer.customer.customerId.eq(customerId)).fetchResults();

        long total = results.getTotal();
        List<Address> content = results.getResults();

        return new PageImpl<>(content, pageable, total);
    }

    @Override
    public Optional<Address> findAddressByIdAndCustomerId(Long addressId, Long customerId) {
        Address result = from(address1)
                .join(address1.member, member)
                .join(member.memberCustomers, memberCustomer)
                .join(memberCustomer.customer, customer)
                .where(address1.addressId.eq(addressId)
                        .and(customer.customerId.eq(customerId)))
                .fetchOne();

        return Optional.ofNullable(result);
    }

    @Override
    public boolean checkIsMyMember(Long customerId, Long memberId) {
        Long count = from(memberCustomer)
                .where(memberCustomer.customer.customerId.eq(customerId)
                        .and(memberCustomer.member.memberId.eq(memberId)))
                .fetchCount();

        return count > 0;
    }
}