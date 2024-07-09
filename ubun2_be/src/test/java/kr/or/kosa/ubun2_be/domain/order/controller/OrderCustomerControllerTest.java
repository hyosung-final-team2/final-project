package kr.or.kosa.ubun2_be.domain.order.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.domain.address.controller.TestSecurityConfig;
import kr.or.kosa.ubun2_be.domain.order.dto.OrderResponse;
import kr.or.kosa.ubun2_be.domain.order.dto.OrderProductResponse;
import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderProductResponse;
import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderResponse;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
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

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private OrderService orderService;

    private List<OrderResponse> orderResponses;
    private List<SubscriptionOrderResponse> subscriptionOrderResponses;

    @BeforeEach
    void setUp() {
        orderResponses = Arrays.asList(
                createOrderResponse()
        );
        subscriptionOrderResponses = Arrays.asList(
                createSubscriptionOrderResponse()
        );
    }

    private OrderResponse createOrderResponse() {
        return new OrderResponse(
                1L,
                "APPROVED",
                "2024-01-01T15:00",
                "김철수",
                "CARD",
                35000
        );
    }

    private SubscriptionOrderResponse createSubscriptionOrderResponse() {
        return new SubscriptionOrderResponse(
                1L,
                "APPROVED",
                "2024-01-01T13:00",
                "김철수",
                "CARD",
                35000
        );
    }

    @Test
    @DisplayName("주문 목록을 페이지네이션과 함께 조회한다")
    void findOrders() throws Exception {
        // Given
        Long customerId = 1L;
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "orderId"));
        Page<OrderResponse> orderPage = new PageImpl<>(orderResponses, pageRequest, orderResponses.size());
        when(orderService.getOrders(eq(customerId), any(PageRequest.class))).thenReturn(orderPage);

        // When & Then
        mockMvc.perform(get("/customers/orders/")
                        .param("customerId", customerId.toString())
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "orderId,desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.content.length()").value(1)) // 데이터가 1개만 들어있음
                .andExpect(jsonPath("$.data.content[0].orderId").value(1))
                .andExpect(jsonPath("$.data.content[0].orderStatus").value("APPROVED"))
                .andExpect(jsonPath("$.data.content[0].memberName").value("김철수"))
                .andExpect(jsonPath("$.data.content[0].paymentType").value("CARD"))
                .andExpect(jsonPath("$.data.content[0].totalOrderPrice").value(35000))
                .andExpect(jsonPath("$.data.totalElements").value(1)) // 데이터가 1개만 들어있음
                .andExpect(jsonPath("$.data.totalPages").value(1))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).getOrders(eq(customerId), any(PageRequest.class));
    }

    @Test
    @DisplayName("정기 주문 목록을 페이지네이션과 함께 조회한다")
    void findSubscriptionOrders() throws Exception {
        // Given
        Long customerId = 1L;
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "subscriptionOrderId"));
        Page<SubscriptionOrderResponse> subscriptionOrderPage = new PageImpl<>(subscriptionOrderResponses, pageRequest, subscriptionOrderResponses.size());
        when(orderService.getSubscriptionOrders(eq(customerId), any(PageRequest.class))).thenReturn(subscriptionOrderPage);

        // When & Then
        mockMvc.perform(get("/customers/orders/subscription")
                        .param("customerId", customerId.toString())
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "subscriptionOrderId,desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.content.length()").value(1)) // 데이터가 1개만 들어있음
                .andExpect(jsonPath("$.data.content[0].subscriptionOrderId").value(1))
                .andExpect(jsonPath("$.data.content[0].orderStatus").value("APPROVED"))
                .andExpect(jsonPath("$.data.content[0].memberName").value("김철수"))
                .andExpect(jsonPath("$.data.content[0].paymentType").value("CARD"))
                .andExpect(jsonPath("$.data.content[0].totalSubscriptionOrderPrice").value(35000))
                .andExpect(jsonPath("$.data.totalElements").value(1)) // 데이터가 1개만 들어있음
                .andExpect(jsonPath("$.data.totalPages").value(1))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).getSubscriptionOrders(eq(customerId), any(PageRequest.class));
    }
}
