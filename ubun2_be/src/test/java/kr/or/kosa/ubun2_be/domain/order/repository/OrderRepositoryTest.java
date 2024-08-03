package kr.or.kosa.ubun2_be.domain.order.repository;

import jakarta.transaction.Transactional;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.cart.entity.Cart;
import kr.or.kosa.ubun2_be.domain.cart.repository.CartRepository;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.entity.MemberCustomer;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.OrderProduct;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.PaymentMethodRepository;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import kr.or.kosa.ubun2_be.domain.product.repository.CategoryRepository;
import kr.or.kosa.ubun2_be.domain.product.repository.ProductRepository;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@ExtendWith(SpringExtension.class)
class OrderRepositoryTest {

    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private PaymentMethodRepository paymentMethodRepository;
    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryRepository categoryRepository;
    @Autowired
    private OrderProductRepository orderProductRepository;

    private Customer testCustomer;
    private Member testMember;
    private Order testOrder;
    private PaymentMethod testPaymentMethod;
    private Cart testCart;
    private Product testProduct;


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
                .memberCustomers(new ArrayList<>())
                .build();
        testMember = memberRepository.save(testMember);

        MemberCustomer memberCustomer = MemberCustomer.builder()
                .member(testMember)
                .customer(testCustomer)
                .build();

        testMember.getMemberCustomers().add(memberCustomer);

        testPaymentMethod = new PaymentMethod(testMember, "Test Payment Method", true);
        testPaymentMethod = paymentMethodRepository.save(testPaymentMethod);

        Category testCategory = Category.builder().categoryName("food").build();
        categoryRepository.save(testCategory);

        testProduct = Product.builder()
                .customer(testCustomer)
                .category(testCategory)
                .productName("apple")
                .productDescription("apples")
                .productPrice(700)
                .productDiscount(0)
                .productStatus(true)
                .orderOption(OrderOption.SINGLE)
                .productImageOriginalName("apple.png")
                .productImagePath("/images/apple.png")
                .build();
        productRepository.save(testProduct);

        testCart = Cart.builder()
                .member(testMember)
                .customer(testCustomer)
                .build();
        cartRepository.save(testCart);

        Address address = Address.builder()
                .addressId(1L)
                .address("34059,대전광역시,유성구,자운로 220-1 109호")
                .build();

        testOrder = Order.builder()
                .member(testMember)
                .paymentMethod(testPaymentMethod)
                .address(address)
                .cart(testCart)
                .orderStatus(OrderStatus.APPROVED)
                .orderProducts(new ArrayList<>())
                .build();
        orderRepository.save(testOrder);

        OrderProduct testOrderProduct = OrderProduct.builder()
                .order(testOrder)
                .product(testProduct)
                .quantity(2)
                .price(testProduct.getProductPrice())
                .orderProductStatus(OrderProductStatus.APPROVED)
                .discount(0)
                .build();
        orderProductRepository.save(testOrderProduct);

        testOrder.getOrderProducts().add(testOrderProduct);

    }


    @Test
    @DisplayName("주문 ID와 고객 ID로 주문 찾기")
    void findOrderByIdAndCustomerId() {
        Optional<Order> foundOrder = orderRepository.findOrderByIdAndCustomerId(testOrder.getOrderId(), testCustomer.getCustomerId());

        assertThat(foundOrder).isPresent();
        assertThat(foundOrder.get().getOrderId()).isEqualTo(testOrder.getOrderId());
        assertThat(foundOrder.get().getMember().getMemberId()).isEqualTo(testMember.getMemberId());
    }

    @Test
    @DisplayName("회원 ID로 주문 목록 찾기")
    void findByMemberId() {
        List<Order> orders = orderRepository.findByMemberId(testMember.getMemberId());

        assertThat(orders).isNotEmpty();
        assertThat(orders).hasSize(1);
        assertThat(orders.get(0).getMember().getMemberId()).isEqualTo(testMember.getMemberId());
    }

    @Test
    @DisplayName("주문 ID와 회원 ID로 주문 찾기")
    void findByOrderIdAndMemberMemberId() {
        Optional<Order> foundOrder = orderRepository.findByOrderIdAndMemberMemberId(testOrder.getOrderId(), testMember.getMemberId());

        assertThat(foundOrder).isPresent();
        assertThat(foundOrder.get().getOrderId()).isEqualTo(testOrder.getOrderId());
        assertThat(foundOrder.get().getMember().getMemberId()).isEqualTo(testMember.getMemberId());
    }

    @Test
    @DisplayName("주문 ID, 회원 ID, 주문 상태로 주문 찾기")
    void findByOrderIdAndMemberMemberIdAndOrderStatus() {
        Optional<Order> foundOrder = orderRepository.findByOrderIdAndMemberMemberIdAndOrderStatus(
                testOrder.getOrderId(), testMember.getMemberId(), OrderStatus.APPROVED);

        assertThat(foundOrder).isPresent();
        assertThat(foundOrder.get().getOrderId()).isEqualTo(testOrder.getOrderId());
        assertThat(foundOrder.get().getMember().getMemberId()).isEqualTo(testMember.getMemberId());
        assertThat(foundOrder.get().getOrderStatus()).isEqualTo(OrderStatus.APPROVED);
    }
    @Test
    @DisplayName("고객 ID와 검색 조건으로 주문 목록 조회")
    void findOrdersByCustomerIdAndSearchRequest() {
        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setSearchCategory("productName");
        searchRequest.setSearchKeyword("apple");

        List<Order> orders = orderRepository.findOrdersByCustomerIdAndSearchRequest(testCustomer.getCustomerId(), searchRequest);

        assertThat(orders).isNotEmpty();
        assertThat(orders.get(0).getOrderStatus()).isEqualTo(OrderStatus.APPROVED);
    }

    @Test
    @DisplayName("고객 ID와 검색 조건으로 PENDING 상태의 주문 목록 조회")
    void findPendingOrdersByCustomerIdAndSearchRequest() {
        Order pendingOrder = Order.builder()
                .member(testMember)
                .cart(testCart)
                .paymentMethod(testPaymentMethod)
                .address(testOrder.getAddress())
                .orderStatus(OrderStatus.PENDING)
                .orderProducts(new ArrayList<>())
                .build();
        orderRepository.save(pendingOrder);

        SearchRequest searchRequest = new SearchRequest();
        List<Order> orders = orderRepository.findPendingOrdersByCustomerIdAndSearchRequest(testCustomer.getCustomerId(), searchRequest);

        assertThat(orders).isNotEmpty();
        assertThat(orders.get(0).getOrderStatus()).isEqualTo(OrderStatus.PENDING);
    }

    @Test
    @DisplayName("주문 ID와 고객 ID로 PENDING 상태의 주문 찾기")
    void findPendingOrderByIdAndCustomerId() {
        Order pendingOrder = Order.builder()
                .member(testMember)
                .cart(testCart)
                .paymentMethod(testPaymentMethod)
                .address(testOrder.getAddress())
                .orderStatus(OrderStatus.PENDING)
                .orderProducts(new ArrayList<>())
                .build();
        pendingOrder = orderRepository.save(pendingOrder);

        Optional<Order> foundOrder = orderRepository.findPendingOrderByIdAndCustomerId(pendingOrder.getOrderId(), testCustomer.getCustomerId());

        assertThat(foundOrder).isPresent();
        assertThat(foundOrder.get().getOrderStatus()).isEqualTo(OrderStatus.PENDING);
    }

    @Test
    @DisplayName("날짜 범위와 고객 ID로 주문 목록 조회")
    void findOrdersByDateRangeAndCustomerId() {
        LocalDateTime startDate = LocalDateTime.now().minusDays(1);
        LocalDateTime endDate = LocalDateTime.now().plusDays(1);

        List<Order> orders = orderRepository.findOrdersByDateRangeAndCustomerId(startDate, endDate, testCustomer.getCustomerId());

        assertThat(orders).isNotEmpty();
        assertThat(orders.get(0).getOrderId()).isEqualTo(testOrder.getOrderId());
    }

    @Test
    @DisplayName("날짜 범위와 고객 ID로 모든 주문 목록 조회")
    void findAllOrdersByDateRangeAndCustomerId() {
        LocalDateTime startDate = LocalDateTime.now().minusDays(1);
        LocalDateTime endDate = LocalDateTime.now().plusDays(1);

        List<Order> orders = orderRepository.findAllOrdersByDateRangeAndCustomerId(startDate, endDate, testCustomer.getCustomerId());

        assertThat(orders).isNotEmpty();
        assertThat(orders.get(0).getOrderId()).isEqualTo(testOrder.getOrderId());
    }

    @Test
    @DisplayName("고객 ID와 날짜 범위로 가장 많이 팔린 상품 조회")
    void findTopSellingProductsByCustomerId() {
        LocalDateTime startDate = LocalDateTime.now().minusDays(1);
        LocalDateTime endDate = LocalDateTime.now().plusDays(1);

        List<Object[]> topSellingProducts = orderRepository.findTopSellingProductsByCustomerId(testCustomer.getCustomerId(), startDate, endDate);

        for (Object[] topSellingProduct : topSellingProducts) {
            System.out.println("topSellingProduct = " + Arrays.toString(Arrays.stream(topSellingProduct).toArray()));
        }
        assertThat(topSellingProducts).isNotEmpty();
        assertThat(topSellingProducts.get(0)[1]).isEqualTo(testProduct.getProductName());
    }

    @Test
    @DisplayName("날짜 범위로 주소 목록 조회")
    void findAddressesByDateRange() {
        LocalDateTime startDate = LocalDateTime.now().minusDays(1);
        LocalDateTime endDate = LocalDateTime.now().plusDays(1);

        List<Address> addresses = orderRepository.findAddressesByDateRange(testCustomer.getCustomerId(), startDate, endDate);

        assertThat(addresses).isNotEmpty();
        assertThat(addresses.get(0).getAddress()).isEqualTo("34059,대전광역시,유성구,자운로 220-1 109호");
    }

    @Test
    @DisplayName("고객과 날짜 범위로 주문 수 계산")
    void countOrdersByCustomerAndDateRange() {
        LocalDateTime startDate = LocalDateTime.now().minusDays(1);
        LocalDateTime endDate = LocalDateTime.now().plusDays(1);

        Long orderCount = orderRepository.countOrdersByCustomerAndDateRange(startDate, endDate, testCustomer.getCustomerId());

        assertThat(orderCount).isEqualTo(1L);
    }

    @Test
    @DisplayName("고객과 날짜 범위로 주문 총액 계산")
    void sumOrderTotalByCustomerAndDateRange() {
        LocalDateTime startDate = LocalDateTime.now().minusDays(1);
        LocalDateTime endDate = LocalDateTime.now().plusDays(1);

        Long totalSum = orderRepository.sumOrderTotalByCustomerAndDateRange(startDate, endDate, testCustomer.getCustomerId());

        assertThat(totalSum).isEqualTo(1400L);
    }
}