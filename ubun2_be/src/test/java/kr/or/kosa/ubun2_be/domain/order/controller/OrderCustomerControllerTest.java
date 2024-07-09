package kr.or.kosa.ubun2_be.domain.order.controller;

import kr.or.kosa.ubun2_be.domain.address.controller.TestSecurityConfig;
import kr.or.kosa.ubun2_be.domain.order.dto.*;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.OrderProduct;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = OrderCustomerController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import(TestSecurityConfig.class)
class OrderCustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private OrderService orderService;

    private List<UnifiedOrderResponse> orderResponses;

    @BeforeEach
    void setUp() {
        orderResponses = Arrays.asList(
                createOrderResponse(1L, "APPROVED", "2024-01-01T13:00", "김철수", "CARD", 35000, false),
                createOrderResponse(2L, "APPROVED", "2024-01-01T14:00", "이영희", "ACCOUNT", 50000, true)
        );
    }

    private UnifiedOrderResponse createOrderResponse(Long orderId, String orderStatus, String createdAt,
                                                     String memberName, String paymentType, int totalOrderPrice,
                                                     boolean isSubscription) {
        return new UnifiedOrderResponse(
                orderId, orderStatus, createdAt, memberName, paymentType, totalOrderPrice, isSubscription
        );
    }

    @Test
    @DisplayName("주문 목록을 페이지네이션과 함께 조회한다")
    void getOrders() throws Exception {
        // Given
        Long customerId = 1L;
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "orderId"));
        Page<UnifiedOrderResponse> orderPage = new PageImpl<>(orderResponses, pageRequest, orderResponses.size());
        when(orderService.getOrders(eq(customerId), any(SearchRequest.class), any(PageRequest.class))).thenReturn(orderPage);

        // When & Then
        mockMvc.perform(get("/customers/orders/")
                        .param("customerId", customerId.toString())
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "orderId,desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.content.length()").value(2))
                .andExpect(jsonPath("$.data.content[0].orderId").value(1))
                .andExpect(jsonPath("$.data.content[0].orderStatus").value("APPROVED"))
                .andExpect(jsonPath("$.data.content[0].memberName").value("김철수"))
                .andExpect(jsonPath("$.data.content[0].paymentType").value("CARD"))
                .andExpect(jsonPath("$.data.content[0].totalOrderPrice").value(35000))
                .andExpect(jsonPath("$.data.content[0].subscription").value(false))
                .andExpect(jsonPath("$.data.totalElements").value(2))
                .andExpect(jsonPath("$.data.totalPages").value(1))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).getOrders(eq(customerId), any(SearchRequest.class), any(PageRequest.class));
    }

    @Test
    @DisplayName("주문 ID로 주문 상세 정보를 성공적으로 조회한다")
    void getOrderByOrderId() throws Exception {
        // Given
        Long orderId = 1L;
        Long customerId = 1L;
        OrderDetailResponse orderDetailResponse = createOrderDetailResponse();

        when(orderService.getOrderByCustomerIdAndOrderId(eq(orderId), eq(customerId)))
                .thenReturn(orderDetailResponse);

        // When & Then
        mockMvc.perform(get("/customers/orders/{order_id}", orderId)
                        .param("customerId", customerId.toString()))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.memberName").value("김철수"))
                .andExpect(jsonPath("$.data.memberEmail").value("user1@example.com"))
                .andExpect(jsonPath("$.data.memberPhone").value("010-1234-5678"))
                .andExpect(jsonPath("$.data.createdAt").value("2024-01-01T15:00:00"))
                .andExpect(jsonPath("$.data.addressNickname").value("집"))
                .andExpect(jsonPath("$.data.address").value("서울시 강남구 테헤란로 123"))
                .andExpect(jsonPath("$.data.paymentType").value("CARD"))
                .andExpect(jsonPath("$.data.cardCompanyName").value("신한카드"))
                .andExpect(jsonPath("$.data.cardNumber").value("1234-5678-9012-3456"))
                .andExpect(jsonPath("$.data.paymentMethodNickname").value("내 신용카드"))
                .andExpect(jsonPath("$.data.orderAmount").value(25000))
                .andExpect(jsonPath("$.data.discountAmount").value(3000))
                .andExpect(jsonPath("$.data.paymentAmount").value(22000))
                .andExpect(jsonPath("$.data.orderProducts").isArray())
                .andExpect(jsonPath("$.data.orderProducts.length()").value(2))
                .andExpect(jsonPath("$.data.orderProducts[0].productName").value("맛있는 사과"))
                .andExpect(jsonPath("$.data.orderProducts[0].price").value(10000))
                .andExpect(jsonPath("$.data.orderProducts[1].productName").value("달콤배"))
                .andExpect(jsonPath("$.data.orderProducts[1].price").value(15000))
                .andExpect(jsonPath("$.data.orderStatus").value("APPROVED"))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).getOrderByCustomerIdAndOrderId(eq(orderId), eq(customerId));
    }

    private OrderDetailResponse createOrderDetailResponse() {
        Order order = Order.builder()
                .orderId(1L)
                .orderStatus(OrderStatus.APPROVED)
                .build();

        Product product1 = Product.builder()
                .productId(1L)
                .productName("맛있는 사과")
                .productDescription("신선한 사과")
                .productPrice(10000)
                .productDiscount(1000)
                .stockQuantity(100)
                .orderOption(OrderOption.BOTH)
                .productStatus(true)
                .build();

        Product product2 = Product.builder()
                .productId(2L)
                .productName("달콤배")
                .productDescription("달콤한 배")
                .productPrice(15000)
                .productDiscount(2000)
                .stockQuantity(80)
                .orderOption(OrderOption.SINGLE)
                .productStatus(true)
                .build();

        OrderProduct orderProduct1 = new OrderProduct(1L, order, product1, 1, 10000, 1000, OrderProductStatus.APPROVED);
        OrderProduct orderProduct2 = new OrderProduct(2L, order, product2, 1, 15000, 2000, OrderProductStatus.APPROVED);

        List<OrderDetailProductResponse> orderProducts = Arrays.asList(
                new OrderDetailProductResponse(orderProduct1),
                new OrderDetailProductResponse(orderProduct2)
        );

        return new OrderDetailResponse(
                "김철수", "user1@example.com", "010-1234-5678", "2024-01-01T15:00:00",
                "집", "서울시 강남구 테헤란로 123", "CARD", null, null,
                "신한카드", "1234-5678-9012-3456", "내 신용카드",
                25000, 3000, 22000, orderProducts, OrderStatus.APPROVED
        );
    }
}