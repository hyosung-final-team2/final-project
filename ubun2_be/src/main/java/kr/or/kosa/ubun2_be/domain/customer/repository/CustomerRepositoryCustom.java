package kr.or.kosa.ubun2_be.domain.customer.repository;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;

import java.util.List;

public interface CustomerRepositoryCustom {
    List<Customer> findCustomersByMemberId(Long memberId);
}
