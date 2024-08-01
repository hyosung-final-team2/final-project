package kr.or.kosa.ubun2_be.domain.cart.repository;

import kr.or.kosa.ubun2_be.domain.cart.entity.Cart;
import kr.or.kosa.ubun2_be.domain.cart.entity.CartProduct;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import kr.or.kosa.ubun2_be.domain.product.repository.CategoryRepository;
import kr.or.kosa.ubun2_be.domain.product.repository.ProductRepository;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class CartRepositoryTest {


    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    private Member member;
    private Customer customer;
    private Product product;
    private Cart cart;
    private Category category;

    @BeforeEach
    void setUp() {
        customer = customerRepository.save(createTestCustomer());
        member = memberRepository.save(createTestMember("member1"));
        category = categoryRepository.save(createTestCategory());
        product = productRepository.save(createTestProduct(customer, category));

        cart = Cart.builder()
                .member(member)
                .customer(customer)
                .cartProducts(new ArrayList<>())
                .build();
        cart = cartRepository.save(cart);

        CartProduct cartProduct = CartProduct.builder()
                .cart(cart)
                .product(product)
                .quantity(2)
                .orderOption(OrderOption.SINGLE)
                .build();
        cart.getCartProducts().add(cartProduct);
        cartRepository.save(cart);
    }



    @Test
    @DisplayName("회원 ID와 고객 ID로 장바구니 찾기")
    void findByMemberIdAndCustomerId() {
        Optional<Cart> foundCart = cartRepository.findByMemberIdAndCustomerId(member.getMemberId(), customer.getCustomerId());

        assertThat(foundCart).isPresent();
        assertThat(foundCart.get().getMember().getMemberId()).isEqualTo(member.getMemberId());
        assertThat(foundCart.get().getCustomer().getCustomerId()).isEqualTo(customer.getCustomerId());
    }

    @Test
    @DisplayName("회원 ID로 장바구니 목록 찾기")
    void findByMemberId() {
        List<Cart> carts = cartRepository.findByMemberId(member.getMemberId());

        assertThat(carts).hasSize(1);
        assertThat(carts.get(0).getMember().getMemberId()).isEqualTo(member.getMemberId());
    }

    @Test
    @DisplayName("사용자 ID로 장바구니 페이지 조회")
    void findCarts() {
        Pageable pageable = PageRequest.of(0, 10);
        Page<Cart> cartPage = cartRepository.findCarts(member.getMemberId(), pageable);

        assertThat(cartPage.getContent()).hasSize(1);
        assertThat(cartPage.getContent().get(0).getMember().getMemberId()).isEqualTo(member.getMemberId());
        assertThat(cartPage.getContent().get(0).getCartProducts()).hasSize(1);
        assertThat(cartPage.getContent().get(0).getCartProducts().get(0).getProduct().getProductName()).isEqualTo("Test Product");
    }

    private Customer createTestCustomer() {
        return Customer.builder()
                .customerLoginId("customer1")
                .customerPassword("password12@")
                .customerName("Test1")
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
                .userRole(UserRole.ROLE_MEMBER)
                .memberCustomers(new ArrayList<>())
                .build();
    }

    private Category createTestCategory() {
        return Category.builder()
                .categoryName("Test Category")
                .build();
    }

    private Product createTestProduct(Customer customer, Category category) {
        return Product.builder()
                .customer(customer)
                .category(category)
                .productName("Test Product")
                .productDescription("This is a test product")
                .productPrice(1000)
                .stockQuantity(100)
                .productDiscount(10)
                .productStatus(true)
                .orderOption(OrderOption.SINGLE)
                .productImageOriginalName("test_image.jpg")
                .productImagePath("/images/test_image.jpg")
                .build();
    }
}