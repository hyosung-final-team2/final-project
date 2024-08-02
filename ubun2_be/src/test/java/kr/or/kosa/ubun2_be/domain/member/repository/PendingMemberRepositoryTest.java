package kr.or.kosa.ubun2_be.domain.member.repository;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;


@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(PendingMemberRepositoryImpl.class)
class PendingMemberRepositoryTest {

    @Autowired
    private PendingMemberRepository pendingMemberRepository;

    @Autowired
    private CustomerRepository customerRepository;

    private Customer testCustomer;
    private PendingMember testPendingMember1;
    private PendingMember testPendingMember2;

    @BeforeEach
    void setUp() {
        testCustomer = customerRepository.save(Customer.builder()
                .customerLoginId("testcustomer")
                .customerPassword("password")
                .customerName("Test Customer")
                .customerEmail("customer@test.com")
                .customerPhone("010-1111-2222")
                .businessRegistrationNumber("123-45-67890")
                .businessName("Test Business")
                .businessOwner("Test Owner")
                .businessOpenDate("2022-01-01")
                .businessAddress("Test Address")
                .description("Test Description")
                .userRole(UserRole.ROLE_CUSTOMER)
                .build());

        testPendingMember1 = pendingMemberRepository.save(PendingMember.builder()
                .pendingMemberEmail("pending1@test.com")
                .pendingMemberName("Pending Member 1")
                .pendingMemberPhone("010-3333-4444")
                .customer(testCustomer)
                .build());

        testPendingMember2 = pendingMemberRepository.save(PendingMember.builder()
                .pendingMemberEmail("pending2@test.com")
                .pendingMemberName("Pending Member 2")
                .pendingMemberPhone("010-5555-6666")
                .customer(testCustomer)
                .build());
    }

    @Test
    @DisplayName("이메일로 PendingMember 찾기")
    void findByPendingMemberEmail() {
        List<PendingMember> foundMembers = pendingMemberRepository.findByPendingMemberEmail("pending1@test.com");
        assertThat(foundMembers).hasSize(1);
        assertThat(foundMembers.get(0).getPendingMemberName()).isEqualTo("Pending Member 1");
    }

    @Test
    @DisplayName("고객 ID와 PendingMember ID로 존재 여부 확인")
    void existsByCustomerIdAndPendingMemberId() {
        boolean exists = pendingMemberRepository.existsByCustomerIdAndPendingMemberId(
                testCustomer.getCustomerId(), testPendingMember1.getPendingMemberId());
        assertThat(exists).isTrue();

        boolean notExists = pendingMemberRepository.existsByCustomerIdAndPendingMemberId(
                testCustomer.getCustomerId(), 9999L);
        assertThat(notExists).isFalse();
    }

    @Test
    @DisplayName("고객 ID로 PendingMember 수 조회")
    void countByCustomerCustomerId() {
        long count = pendingMemberRepository.countByCustomerCustomerId(testCustomer.getCustomerId());
        assertThat(count).isEqualTo(2);
    }

    @Test
    @DisplayName("고객 ID와 검색 조건으로 PendingMember 목록 조회")
    void findPendingMembersByCustomerIdAndSearchRequest() {
        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setSearchCategory("memberName");
        searchRequest.setSearchKeyword("Pending");

        List<PendingMember> foundMembers = pendingMemberRepository.findPendingMembersByCustomerIdAndSearchRequest(
                testCustomer.getCustomerId(), searchRequest);
        assertThat(foundMembers).hasSize(2);
        assertThat(foundMembers).extracting(PendingMember::getPendingMemberName)
                .containsExactlyInAnyOrder("Pending Member 1", "Pending Member 2");
    }

    @Test
    @DisplayName("고객 ID와 검색 조건으로 PendingMember 목록 조회 - 이메일 검색")
    void findPendingMembersByCustomerIdAndSearchRequestEmail() {
        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setSearchCategory("memberEmail");
        searchRequest.setSearchKeyword("pending1");

        List<PendingMember> foundMembers = pendingMemberRepository.findPendingMembersByCustomerIdAndSearchRequest(
                testCustomer.getCustomerId(), searchRequest);
        assertThat(foundMembers).hasSize(1);
        assertThat(foundMembers.get(0).getPendingMemberEmail()).isEqualTo("pending1@test.com");
    }

    @Test
    @DisplayName("고객 ID와 검색 조건으로 PendingMember 목록 조회 - 생성일자 검색")
    void findPendingMembersByCustomerIdAndSearchRequestCreatedAt() {
        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setSearchCategory("createdAt");
        searchRequest.setSearchKeyword("2023-01-01,2023-12-31");

        List<PendingMember> foundMembers = pendingMemberRepository.findPendingMembersByCustomerIdAndSearchRequest(
                testCustomer.getCustomerId(), searchRequest);
        assertThat(foundMembers).isEmpty();
    }
}