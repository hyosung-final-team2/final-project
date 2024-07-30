package kr.or.kosa.ubun2_be.domain.order.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.order.dto.*;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class OrderCustomerControllerTest extends CommonTestSetup {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

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
        return UnifiedOrderResponse.builder()
                .orderId(orderId)
                .orderStatus(orderStatus)
                .createdAt(createdAt)
                .memberName(memberName)
                .paymentType(paymentType)
                .totalOrderPrice(totalOrderPrice)
                .isSubscription(isSubscription)
                .build();
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
        mockMvc.perform(get("/api/customers/orders/")
                        .param("customerId", customerId.toString())
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "orderId,desc")
                        .with(user(customUserDetails)))
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
        OrderDetailResponse mockResponse = new OrderDetailResponse();
        when(orderService.getOrderByCustomerIdAndOrderId(anyLong(), anyLong())).thenReturn(mockResponse);

        // When & Then
        mockMvc.perform(get("/api/customers/orders/{order_id}", orderId)
                        .with(user(customUserDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).getOrderByCustomerIdAndOrderId(eq(customUserDetails.getUserId()), eq(orderId));
    }

    @Test
    @DisplayName("정기 주문 상세를 조회한다")
    void getSubscriptionOrderByOrderId() throws Exception {
        // Given
        Long orderId = 1L;
        SubscriptionOrderDetailResponse mockResponse = new SubscriptionOrderDetailResponse();
        when(orderService.getSubscriptionOrderByCustomerIdAndOrderId(anyLong(), anyLong())).thenReturn(mockResponse);

        // When & Then
        mockMvc.perform(get("/api/customers/orders/subscription/{order_id}", orderId)
                        .with(user(customUserDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).getSubscriptionOrderByCustomerIdAndOrderId(eq(customUserDetails.getUserId()), eq(orderId));
    }

    @Test
    @DisplayName("전체 주문 대기 목록을 조회한다")
    void getPendingOrders() throws Exception {
        // Given
        Page<UnifiedOrderResponse> mockPage = new PageImpl<>(Arrays.asList(new UnifiedOrderResponse(), new UnifiedOrderResponse()));
        when(orderService.getPendingOrders(anyLong(), any(), any())).thenReturn(mockPage);

        // When & Then
        mockMvc.perform(get("/api/customers/orders/pending")
                        .with(user(customUserDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).getPendingOrders(eq(customUserDetails.getUserId()), any(), any());
    }

    @Test
    @DisplayName("대기 단건 주문 리스트를 승인하거나 취소한다")
    void updateOrderStatus() throws Exception {
        // Given
        OrderApproveRequest orderApproveRequest1 = new OrderApproveRequest();
        orderApproveRequest1.setOrderId(1L);
        orderApproveRequest1.setOrderStatus("APPROVED");

        OrderApproveRequest orderApproveRequest2 = new OrderApproveRequest();
        orderApproveRequest2.setOrderId(2L);
        orderApproveRequest2.setOrderStatus("APPROVED");

        List<OrderApproveRequest> requests = Arrays.asList(orderApproveRequest1,orderApproveRequest2);

        // When & Then
        mockMvc.perform(put("/api/customers/orders/approve")
                        .with(user(customUserDetails))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requests)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).updateOrderStatus(eq(customUserDetails.getUserId()), argThat(list -> {
            if (list.size() != 2) return false;
            OrderApproveRequest req1 = list.get(0);
            OrderApproveRequest req2 = list.get(1);
            return req1.getOrderId().equals(1L) && req1.getOrderStatus().equals("APPROVED") &&
                    req2.getOrderId().equals(2L) && req2.getOrderStatus().equals("APPROVED");
        }));

    }

    @Test
    @DisplayName("대기 정기 주문 리스트를 승인하거나 취소한다")
    void updateSubscriptionOrderStatus() throws Exception {
        // Given
        SubscriptionApproveRequest subscriptionApproveRequest1 = new SubscriptionApproveRequest();
        subscriptionApproveRequest1.setSubscriptionOrderId(1L);
        subscriptionApproveRequest1.setOrderStatus("APPROVED");

        SubscriptionApproveRequest subscriptionApproveRequest2 = new SubscriptionApproveRequest();
        subscriptionApproveRequest2.setSubscriptionOrderId(2L);
        subscriptionApproveRequest2.setOrderStatus("APPROVED");
        List<SubscriptionApproveRequest> requests = Arrays.asList(subscriptionApproveRequest1,subscriptionApproveRequest2);

        // When & Then
        mockMvc.perform(put("/api/customers/orders/subscription/approve")
                        .with(user(customUserDetails))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requests)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).updateSubscriptionOrderStatus(eq(customUserDetails.getUserId()), argThat(list -> {
            if (list.size() != 2) return false;
            SubscriptionApproveRequest req1 = list.get(0);
            SubscriptionApproveRequest req2 = list.get(1);
            return req1.getSubscriptionOrderId().equals(1L) && req1.getOrderStatus().equals("APPROVED") &&
                    req2.getSubscriptionOrderId().equals(2L) && req2.getOrderStatus().equals("APPROVED");
        }));    }
}