package kr.or.kosa.ubun2_be.domain.member.repository;

import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long>, MemberRepositoryCustom {

    Optional<Member> findByMemberLoginId(String memberLoginId);

    boolean existsByMemberEmail(String memberEmail);

    Optional<Member> findByMemberEmail(String memberEmail);

    @Query("SELECT m FROM Member m " +
            "LEFT JOIN FETCH m.paymentMethods pm " +
            "WHERE m.memberId = :memberId")
    Optional<Member> findMemberWithPaymentMethodsById(@Param("memberId") Long memberId);

    boolean existsByMemberLoginId(String memberLoginId);

}
