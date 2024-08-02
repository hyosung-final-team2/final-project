package kr.or.kosa.ubun2_be.domain.member.repository;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.entity.MemberCustomer;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class MemberCustomerRepositoryTest {
    @Autowired
    private MemberCustomerRepository memberCustomerRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CustomerRepository customerRepository;

    private Member testMember1;
    private Member testMember2;
    private Customer testCustomer1;
    private Customer testCustomer2;

    @BeforeEach
    void setUp() {
        testMember1 = memberRepository.save(Member.builder()
                .memberLoginId("member1")
                .memberPassword("password")
                .memberName("Test Member 1")
                .memberEmail("member1@test.com")
                .memberPhone("010-1111-1111")
                .userRole(UserRole.ROLE_MEMBER)
                .build());

        testMember2 = memberRepository.save(Member.builder()
                .memberLoginId("member2")
                .memberPassword("password")
                .memberName("Test Member 2")
                .memberEmail("member2@test.com")
                .memberPhone("010-2222-2222")
                .userRole(UserRole.ROLE_MEMBER)
                .build());

        testCustomer1 = customerRepository.save(Customer.builder()
                .customerLoginId("customer1")
                .customerPassword("password")
                .customerName("Test Customer 1")
                .customerEmail("customer1@test.com")
                .customerPhone("010-3333-3333")
                .businessRegistrationNumber("123-45-67890")
                .businessName("Test Business 1")
                .businessOwner("Owner 1")
                .businessOpenDate("2022-01-01")
                .businessAddress("Test Address 1")
                .description("Test Description 1")
                .userRole(UserRole.ROLE_CUSTOMER)
                .build());

        testCustomer2 = customerRepository.save(Customer.builder()
                .customerLoginId("customer2")
                .customerPassword("password")
                .customerName("Test Customer 2")
                .customerEmail("customer2@test.com")
                .customerPhone("010-4444-4444")
                .businessRegistrationNumber("098-76-54321")
                .businessName("Test Business 2")
                .businessOwner("Owner 2")
                .businessOpenDate("2022-02-02")
                .businessAddress("Test Address 2")
                .description("Test Description 2")
                .userRole(UserRole.ROLE_CUSTOMER)
                .build());

        memberCustomerRepository.save(MemberCustomer.builder()
                .member(testMember1)
                .customer(testCustomer1)
                .build());

        memberCustomerRepository.save(MemberCustomer.builder()
                .member(testMember1)
                .customer(testCustomer2)
                .build());

        memberCustomerRepository.save(MemberCustomer.builder()
                .member(testMember2)
                .customer(testCustomer1)
                .build());
    }

    @Test
    @DisplayName("고객 ID와 회원 ID로 존재 여부 확인")
    void existsByCustomerIdAndMemberId() {
        boolean exists = memberCustomerRepository.existsByCustomerIdAndMemberId(testCustomer1.getCustomerId(), testMember1.getMemberId());
        boolean notExists = memberCustomerRepository.existsByCustomerIdAndMemberId(testCustomer2.getCustomerId(), testMember2.getMemberId());

        assertThat(exists).isTrue();
        assertThat(notExists).isFalse();
    }

    @Test
    @DisplayName("회원 ID로 고객 정보를 포함한 MemberCustomer 조회")
    void findByMemberIdFetchJoinCustomers() {
        List<MemberCustomer> memberCustomers = memberCustomerRepository.findByMemberIdFetchJoinCustomers(testMember1.getMemberId());
        assertThat(memberCustomers).hasSize(2);
        assertThat(memberCustomers).allSatisfy(mc -> {
            assertThat(mc.getMember()).isEqualTo(testMember1);
            assertThat(mc.getCustomer()).isNotNull();
        });
    }

    @Test
    @DisplayName("고객 ID로 회원 목록 조회")
    void findMembersByCustomerId() {
        List<Member> members = memberCustomerRepository.findMembersByCustomerId(testCustomer1.getCustomerId());
        assertThat(members).hasSize(2);
        assertThat(members).extracting(Member::getMemberLoginId).containsExactlyInAnyOrder("member1", "member2");
    }

    @Test
    @DisplayName("고객 ID로 MemberCustomer 수 조회")
    void countByCustomerCustomerId() {
        long count = memberCustomerRepository.countByCustomerCustomerId(testCustomer1.getCustomerId());
        long count2 = memberCustomerRepository.countByCustomerCustomerId(testCustomer2.getCustomerId());

        assertThat(count).isEqualTo(2);
        assertThat(count2).isEqualTo(1);
    }
}