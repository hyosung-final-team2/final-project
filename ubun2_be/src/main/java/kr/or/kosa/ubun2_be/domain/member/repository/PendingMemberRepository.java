package kr.or.kosa.ubun2_be.domain.member.repository;

import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PendingMemberRepository extends JpaRepository<PendingMember,Long> {
    List<PendingMember> findByPendingMemberEmail(String memberEmail);

}
