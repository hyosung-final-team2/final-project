package kr.or.kosa.ubun2_be.domain.customer.repository;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

import java.util.List;

import static kr.or.kosa.ubun2_be.domain.customer.entity.QCustomer.customer;
import static kr.or.kosa.ubun2_be.domain.member.entity.QMemberCustomer.memberCustomer;

public class CustomerRepositoryImpl extends QuerydslRepositorySupport implements CustomerRepositoryCustom {
    public CustomerRepositoryImpl() {
        super(Customer.class);
    }

    @Override
    public List<Customer> findCustomersByMemberId(Long memberId) {
        return from(customer)
                .join(customer.memberCustomers, memberCustomer)
                .where(memberCustomer.member.memberId.eq(memberId))
                .fetch();

    }

}
