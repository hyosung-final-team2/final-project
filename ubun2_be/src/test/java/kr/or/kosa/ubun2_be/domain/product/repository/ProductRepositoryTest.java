package kr.or.kosa.ubun2_be.domain.product.repository;

import jakarta.transaction.Transactional;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.product.dto.CategoryRequest;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@ExtendWith(SpringExtension.class)
class ProductRepositoryTest {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private CustomerRepository customerRepository;

    private Customer customer;
    private Category category;
    private Product product;

    @BeforeEach
    void setUp() {
        category = Category.builder().categoryName("food").build();
        categoryRepository.save(category);

        customer = Customer.builder()
                .customerLoginId("customer11")
                .customerPassword("password1")
                .customerName("John Doe")
                .customerPhone("010-1234-5678")
                .customerEmail("customer11@example.com")
                .businessRegistrationNumber("1234567890")
                .businessName("Business1")
                .businessOwner("Owner1")
                .businessOpenDate("2020-01-01 00:00:00")
                .businessAddress("Address1")
                .description("Description1")
                .logoImageOriginalName("logo1.png")
                .logoImagePath("/images/logo1.png")
                .announcement("Announcement1")
                .build();
        customerRepository.save(customer);

        product = Product.builder()
                .customer(customer)
                .category(category)
                .productName("Smartphone")
                .productDescription("Latest smartphone with advanced features")
                .productPrice(700)
                .productDiscount(50)
                .productStatus(true)
                .orderOption(OrderOption.SINGLE)
                .productImageOriginalName("smartphone.png")
                .productImagePath("/images/smartphone.png")
                .build();
        productRepository.save(product);
    }

    @Test
    @DisplayName("판매자ID와 상품ID로 상품 조회")
    void findByCustomerCustomerIdAndProductId() {
        //given
        //when
        Optional<Product> byCustomerCustomerIdAndProductId = productRepository.findByCustomerCustomerIdAndProductId(customer.getCustomerId(), product.getProductId());
        //then
        assertThat(byCustomerCustomerIdAndProductId.get().getProductName()).isEqualTo(product.getProductName());
    }

    @Test
    void existsByProductName() {
        //given
        //when
        boolean exists = productRepository.existsByProductName("Smartphone");
        //then
        assertThat(exists).isTrue();
    }

    @Test
    @DisplayName("판매자ID로 상품 수 조회")
    void countByCustomerCustomerId() {
        //given
        //when
        long count = productRepository.countByCustomerCustomerId(customer.getCustomerId());
        //then
        assertThat(count).isEqualTo(1);
    }

    @Test
    @DisplayName("판매자ID와 상품 상태로 상품 수 조회")
    void countByCustomerCustomerIdAndProductStatus() {
        //given
        //when
        long activeCount = productRepository.countByCustomerCustomerIdAndProductStatus(customer.getCustomerId(), true);
        //then
        assertThat(activeCount).isEqualTo(1);
    }

    @Test
    @DisplayName("상품 검색 테스트")
    void findProducts() {
        //given
        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setSearchCategory("productName");
        searchRequest.setSearchKeyword("Smartphone");
        Pageable pageable = PageRequest.of(0, 10, Sort.by("productPrice").descending());

        //when
        Page<Product> productPage = productRepository.findProducts(customer.getCustomerId(), searchRequest, pageable, false);

        //then
        assertThat(productPage.getContent()).hasSize(1);
        assertThat(productPage.getContent().get(0).getProductName()).isEqualTo("Smartphone");
    }

    @Test
    @DisplayName("카테고리별 상품 검색 테스트")
    void findProductsByCategory() {
        //given
        CategoryRequest categoryRequest = new CategoryRequest();
        categoryRequest.setCategoryName("food");
        Pageable pageable = PageRequest.of(0, 10);

        //when
        Page<Product> productPage = productRepository.findProductsByCategory(customer.getCustomerId(), categoryRequest, pageable);

        //then
        assertThat(productPage.getContent()).hasSize(1);
        assertThat(productPage.getContent().get(0).getCategory().getCategoryName()).isEqualTo("food");
    }
}