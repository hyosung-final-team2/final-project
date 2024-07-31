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
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
class CartProductRepositoryTest {

    @Autowired
    private CartProductRepository cartProductRepository;

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
    private Cart cart;
    private Customer customer;
    private CartProduct cartProduct1;
    private CartProduct cartProduct2;
    private Category category;
    private Product product1;
    private Product product2;

    @BeforeEach
    void setUp() {
        customer = customerRepository.save(createTestCustomer());
        member = memberRepository.save(createTestMember("member1"));
        category = categoryRepository.save(createTestCategory());
        product1 = productRepository.save(createTestProduct(customer, category, "Product 1"));
        product2 = productRepository.save(createTestProduct(customer, category, "Product 2"));


        cart = Cart.builder()
                .member(member)
                .customer(customer)
                .cartProducts(new ArrayList<>())
                .build();
        cart = cartRepository.save(cart);

        cartProduct1 = CartProduct.builder()
                .cart(cart)
                .product(product1)
                .quantity(2)
                .orderOption(OrderOption.SINGLE)
                .build();

        cartProduct2 = CartProduct.builder()
                .cart(cart)
                .product(product2)
                .quantity(1)
                .orderOption(OrderOption.SINGLE)
                .build();

        cartProductRepository.save(cartProduct1);
        cartProductRepository.save(cartProduct2);

    }

    @Test
    @DisplayName("회원 ID와 상품 ID 목록으로 장바구니 상품 삭제")
    void deleteByCart_Member_MemberIdAndProductProductIdIn() {
        // Given
        List<Long> productIds = Arrays.asList(product1.getProductId(), product2.getProductId());

        // When
        cartProductRepository.deleteByCart_Member_MemberIdAndProductProductIdIn(member.getMemberId(), productIds);

        // Then
        List<CartProduct> remainingCartProducts = cartRepository.findById(cart.getCartId()).get().getCartProducts();
        assertThat(remainingCartProducts).isEmpty();
    }

    @Test
    @DisplayName("장바구니 ID와 장바구니 상품 ID로 장바구니 상품 찾기")
    void findByCartCartIdAndCartProductId() {
        // When
        Optional<CartProduct> foundCartProduct = cartProductRepository.findByCartCartIdAndCartProductId(cart.getCartId(), cartProduct1.getCartProductId());

        // Then
        assertThat(foundCartProduct).isPresent();
        assertThat(foundCartProduct.get().getProduct().getProductName()).isEqualTo("Product 1");
        assertThat(foundCartProduct.get().getQuantity()).isEqualTo(2);
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
                .userRole(UserRole.ROLE_MEMBER)
                .memberCustomers(new ArrayList<>())
                .build();
    }

    private Category createTestCategory() {
        return Category.builder()
                .categoryName("Test Category")
                .build();
    }

    private Product createTestProduct(Customer customer, Category category, String productName) {
        return Product.builder()
                .customer(customer)
                .category(category)
                .productName(productName)
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