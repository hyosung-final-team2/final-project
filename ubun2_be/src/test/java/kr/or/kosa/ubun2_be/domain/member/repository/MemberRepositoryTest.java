package kr.or.kosa.ubun2_be.domain.member.repository;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.entity.MemberCustomer;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Import(MemberRepositoryImpl.class)
class MemberRepositoryTest {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CustomerRepository customerRepository;

    private Member testMember;
    private Customer testCustomer;

    @BeforeEach
    void setUp() {
        testCustomer = Customer.builder()
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
                .build();
        testCustomer = customerRepository.save(testCustomer);

        testMember = Member.builder()
                .memberLoginId("testmember")
                .memberPassword("password")
                .memberName("Test Member")
                .memberEmail("member@test.com")
                .memberPhone("010-3333-4444")
                .userRole(UserRole.ROLE_MEMBER)
                .paymentMethods(new ArrayList<>())
                .memberCustomers(new ArrayList<>())
                .build();
        testMember = memberRepository.save(testMember);

        MemberCustomer memberCustomer = MemberCustomer.builder()
                .member(testMember)
                .customer(testCustomer)
                .build();
        testMember.getMemberCustomers().add(memberCustomer);
        memberRepository.save(testMember);

        PaymentMethod paymentMethod = new PaymentMethod(testMember,"Test Payment Method");
        testMember.getPaymentMethods().add(paymentMethod);
        memberRepository.save(testMember);
    }

    @Test
    @DisplayName("회원 로그인 ID로 회원 찾기")
    void findByMemberLoginId() {
        Optional<Member> foundMember = memberRepository.findByMemberLoginId("testmember");
        assertThat(foundMember).isPresent();
        assertThat(foundMember.get().getMemberName()).isEqualTo("Test Member");
    }

    @Test
    @DisplayName("회원 이메일 존재 여부 확인")
    void existsByMemberEmail() {
        boolean exists = memberRepository.existsByMemberEmail("member@test.com");
        boolean notExists = memberRepository.existsByMemberEmail("nonexistent@test.com");

        assertThat(exists).isTrue();
        assertThat(notExists).isFalse();
    }

    @Test
    @DisplayName("회원 이메일로 회원 찾기")
    void findByMemberEmail() {
        Optional<Member> foundMember = memberRepository.findByMemberEmail("member@test.com");
        assertThat(foundMember).isPresent();
        assertThat(foundMember.get().getMemberName()).isEqualTo("Test Member");
    }

    @Test
    @DisplayName("회원 ID로 결제 수단을 포함한 회원 찾기")
    void findMemberWithPaymentMethodsById() {
        Optional<Member> foundMember = memberRepository.findMemberWithPaymentMethodsById(testMember.getMemberId());
        assertThat(foundMember).isPresent();
        assertThat(foundMember.get().getPaymentMethods()).hasSize(1);
    }

    @Test
    @DisplayName("회원 로그인 ID 존재 여부 확인")
    void existsByMemberLoginId() {
        boolean exists = memberRepository.existsByMemberLoginId("testmember");
        boolean notExists = memberRepository.existsByMemberLoginId("nonexistent");

        assertThat(exists).isTrue();
        assertThat(notExists).isFalse();
    }

    @Test
    @DisplayName("고객 ID와 검색 조건으로 회원 목록 조회")
    void findMembersByCustomerIdAndSearchRequest() {
        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setSearchCategory("memberName");
        searchRequest.setSearchKeyword("Test");

        List<Member> foundMembers = memberRepository.findMembersByCustomerIdAndSearchRequest(testCustomer.getCustomerId(), searchRequest);
        assertThat(foundMembers).hasSize(1);
        assertThat(foundMembers.get(0).getMemberName()).isEqualTo("Test Member");
    }

    @Test
    @DisplayName("날짜 범위로 회원 검색")
    void findMembersByDateRange() {
        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setSearchCategory("createdAt");
        LocalDateTime now = LocalDateTime.now();
        String dateRange = now.minusDays(1).toLocalDate() + "," + now.plusDays(1).toLocalDate();
        searchRequest.setSearchKeyword(dateRange);

        List<Member> foundMembers = memberRepository.findMembersByCustomerIdAndSearchRequest(testCustomer.getCustomerId(), searchRequest);
        assertThat(foundMembers).hasSize(1);
        assertThat(foundMembers.get(0).getMemberName()).isEqualTo("Test Member");
    }

}