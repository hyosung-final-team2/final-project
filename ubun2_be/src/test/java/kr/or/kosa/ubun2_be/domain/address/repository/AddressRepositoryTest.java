package kr.or.kosa.ubun2_be.domain.address.repository;

import jakarta.transaction.Transactional;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
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
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class AddressRepositoryTest {
    @Autowired
    private AddressRepository addressRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private MemberRepository memberRepository;

    private Customer customer;
    private Member member1, member2;
    private Address address1, address2;

    @BeforeEach
    void setUp() {
        customer = customerRepository.save(createTestCustomer());
        member1 = memberRepository.save(createTestMember("member1"));
        member2 = memberRepository.save(createTestMember("member2"));

        linkMemberToCustomer(member1, customer);
        linkMemberToCustomer(member2, customer);

        address1 = addressRepository.save(createTestAddress(member1, "Test Address 1", "Home", true));
        address2 = addressRepository.save(createTestAddress(member2, "Test Address 2", "Office", false));
    }

    @Test
    @DisplayName("회원 ID로 주소 찾기")
    void findByMemberMemberId() {
        List<Address> addresses = addressRepository.findByMemberMemberId(member1.getMemberId());
        assertThat(addresses).hasSize(1);
        assertThat(addresses.get(0).getAddress()).isEqualTo("Test Address 1");
    }

    @Test
    @DisplayName("주소 ID와 회원 ID로 주소 찾기")
    void findByAddressIdAndMemberMemberId() {
        Optional<Address> foundAddress = addressRepository.findByAddressIdAndMemberMemberId(address1.getAddressId(), member1.getMemberId());
        assertThat(foundAddress).isPresent();
        assertThat(foundAddress.get().getAddress()).isEqualTo("Test Address 1");
    }

    @Test
    @DisplayName("전체 주소 목록 조회 (페이징 및 검색)")
    void findAllAddressesWithMember() {
        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setSearchCategory("address");
        searchRequest.setSearchKeyword("Test");

        Page<Address> result = addressRepository.findAllAddressesWithMember(
                PageRequest.of(0, 10, Sort.by("address").ascending()),
                searchRequest,
                customer.getCustomerId()
        );

        assertThat(result.getContent()).hasSize(2);
        assertThat(result.getContent()).extracting("address")
                .containsExactly("Test Address 1", "Test Address 2");
    }

    @Test
    @DisplayName("고객 ID와 주소 ID로 주소 찾기")
    void findAddressByIdAndCustomerId() {
        Optional<Address> result = addressRepository.findAddressByIdAndCustomerId(address1.getAddressId(), customer.getCustomerId());
        assertThat(result).isPresent();
        assertThat(result.get().getAddress()).isEqualTo("Test Address 1");
    }

    @Test
    @DisplayName("고객과 회원의 연관 관계 확인")
    void checkIsMyMember() {
        boolean result = addressRepository.checkIsMyMember(customer.getCustomerId(), member1.getMemberId());
        assertThat(result).isTrue();
    }

    private Customer createTestCustomer() {
        return Customer.builder()
                .customerLoginId("customer1")
                .customerPassword("password12@")
                .customerName("Test Customer")
                .customerPhone("010-1111-2222")
                .customerEmail("customer1@example.com")
                .businessRegistrationNumber("123-45-67890")
                .businessName("Test Business")
                .businessOwner("Test Owner")
                .businessOpenDate("2022-01-01")
                .businessAddress("Test Business Address")
                .description("Test Description")
                .userRole(UserRole.ROLE_CUSTOMER)
                .build();
    }

    private Member createTestMember(String id) {
        return Member.builder()
                .memberLoginId(id)
                .memberPassword("password12@")
                .memberName("Test " + id)
                .memberEmail(id + "@example.com")
                .memberPhone("010-1234-5678")
                .memberCustomers(new ArrayList<>())
                .userRole(UserRole.ROLE_MEMBER)
                .build();
    }

    private Address createTestAddress(Member member, String address, String nickname, boolean isDefault) {
        return Address.builder()
                .member(member)
                .address(address)
                .addressNickname(nickname)
                .recipientName(member.getMemberName())
                .recipientPhone(member.getMemberPhone())
                .defaultStatus(isDefault)
                .build();
    }

    private void linkMemberToCustomer(Member member, Customer customer) {
        MemberCustomer memberCustomer = MemberCustomer.builder()
                .member(member)
                .customer(customer)
                .build();
        member.getMemberCustomers().add(memberCustomer);
        memberRepository.save(member);
    }
}