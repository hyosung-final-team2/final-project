package kr.or.kosa.ubun2_be.domain.member.repository;

import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PendingMemberRepository extends JpaRepository<PendingMember,Long> {
}
