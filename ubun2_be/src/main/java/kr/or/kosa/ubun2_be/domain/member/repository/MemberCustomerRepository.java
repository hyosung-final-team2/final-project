package kr.or.kosa.ubun2_be.domain.member.repository;

import io.lettuce.core.dynamic.annotation.Param;
import kr.or.kosa.ubun2_be.domain.member.entity.MemberCustomer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface MemberCustomerRepository extends JpaRepository<MemberCustomer,Long> {

    @Query("SELECT CASE WHEN COUNT(mc) > 0 THEN true ELSE false END " +
            "FROM MemberCustomer mc " +
            "WHERE mc.customer.customerId = :customerId " +
            "AND mc.member.memberId = :memberId")
    boolean existsByCustomerIdAndMemberId(@Param("customerId") Long customerId, @Param("memberId") Long memberId);
}
