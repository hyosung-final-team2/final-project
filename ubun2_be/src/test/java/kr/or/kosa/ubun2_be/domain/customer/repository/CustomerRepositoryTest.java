package kr.or.kosa.ubun2_be.domain.customer.repository;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.entity.MemberCustomer;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class CustomerRepositoryTest {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MemberRepository memberRepository;

    private Customer testCustomer;
    private Member testMember;
    private List<Customer> testCustomers;

    @BeforeEach
    void setUp() {
        // Create test member
        testMember = Member.builder()
                .memberLoginId("testmember")
                .memberPassword("password123")
                .memberName("Test Member")
                .memberEmail("member@example.com")
                .memberPhone("010-1111-2222")
                .userRole(UserRole.ROLE_MEMBER)
                .memberCustomers(new ArrayList<>())
                .build();
        memberRepository.save(testMember);

        // Create test customers
        testCustomers = new ArrayList<>();
        for (int i = 0; i < 3; i++) {
            Customer customer = Customer.builder()
                    .customerLoginId("customer" + i)
                    .customerPassword("password" + i)
                    .customerName("Customer " + i)
                    .customerPhone("010-1234-567" + i)
                    .customerEmail("customer" + i + "@example.com")
                    .businessRegistrationNumber("123-45-6789" + i)
                    .businessName("Business " + i)
                    .businessOwner("Owner " + i)
                    .businessOpenDate("2022-01-0" + (i+1))
                    .businessAddress("Address " + i)
                    .description("Description " + i)
                    .announcement("Announcement " + i)
                    .userRole(UserRole.ROLE_CUSTOMER)
                    .build();
            customer = customerRepository.save(customer);
            testCustomers.add(customer);

            MemberCustomer memberCustomer = MemberCustomer.builder()
                    .member(testMember)
                    .customer(customer)
                    .build();
            testMember.getMemberCustomers().add(memberCustomer);
        }

        memberRepository.save(testMember);

        // Set the first customer as testCustomer for individual tests
        testCustomer = testCustomers.get(0);
    }


    @Test
    @DisplayName("고객 로그인 ID로 존재 여부 확인")
    void existsByCustomerLoginId() {
        boolean exists = customerRepository.existsByCustomerLoginId("customer0");
        boolean notExists = customerRepository.existsByCustomerLoginId("nonexistent");

        assertThat(exists).isTrue();
        assertThat(notExists).isFalse();
    }

    @Test
    @DisplayName("고객 로그인 ID로 고객 찾기")
    void findByCustomerLoginId() {
        Optional<Customer> foundCustomer = customerRepository.findByCustomerLoginId("customer0");
        Optional<Customer> notFoundCustomer = customerRepository.findByCustomerLoginId("nonexistent");

        assertThat(foundCustomer).isPresent();
        assertThat(foundCustomer.get().getCustomerName()).isEqualTo("Customer 0");
        assertThat(notFoundCustomer).isEmpty();
    }

    @Test
    @DisplayName("고객 이메일로 고객 찾기")
    void findByCustomerEmail() {
        Optional<Customer> foundCustomer = customerRepository.findByCustomerEmail("customer0@example.com");
        Optional<Customer> notFoundCustomer = customerRepository.findByCustomerEmail("nonexistent@example.com");

        assertThat(foundCustomer).isPresent();
        assertThat(foundCustomer.get().getCustomerName()).isEqualTo("Customer 0");
        assertThat(notFoundCustomer).isEmpty();
    }

    @Test
    @DisplayName("고객 ID로 사업자명 찾기")
    void findBusinessNameByCustomerId() {
        String businessName = customerRepository.findBusinessNameByCustomerId(testCustomer.getCustomerId());
        assertThat(businessName).isEqualTo("Business 0");
    }

    @Test
    @DisplayName("고객 ID로 공지사항 찾기")
    void findAnnouncementByCustomerId() {
        Optional<String> announcement = customerRepository.findAnnouncementByCustomerId(testCustomer.getCustomerId());
        assertThat(announcement).isPresent();
        assertThat(announcement.get()).isEqualTo("Announcement 0");
    }

    @Test
    @DisplayName("고객 이메일로 존재 여부 확인")
    void existsByCustomerEmail() {
        boolean exists = customerRepository.existsByCustomerEmail("customer0@example.com");
        boolean notExists = customerRepository.existsByCustomerEmail("nonexistent@example.com");

        assertThat(exists).isTrue();
        assertThat(notExists).isFalse();
    }
    @Test
    @DisplayName("회원 ID로 고객 목록 조회")
    void findCustomersByMemberId() {
        List<Customer> foundCustomers = customerRepository.findCustomersByMemberId(testMember.getMemberId());

        assertThat(foundCustomers).hasSize(3);
        assertThat(foundCustomers).containsExactlyInAnyOrderElementsOf(testCustomers);
    }

}