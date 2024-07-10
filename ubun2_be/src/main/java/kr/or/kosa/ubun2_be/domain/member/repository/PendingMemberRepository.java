package kr.or.kosa.ubun2_be.domain.member.repository;

import io.lettuce.core.dynamic.annotation.Param;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PendingMemberRepository extends JpaRepository<PendingMember,Long>,PendingMemberRepositoryCustom {
    List<PendingMember> findByPendingMemberEmail(String memberEmail);

    @Query("SELECT CASE WHEN COUNT(pm) > 0 THEN true ELSE false END " +
            "FROM PendingMember pm " +
            "WHERE pm.customer.customerId = :customerId " +
            "AND pm.pendingMemberId = :pendingMemberId")
    boolean existsByCustomerIdAndPendingMemberId(@Param("customerId") Long customerId, @Param("pendingMemberId") Long pendingMemberId);
}
