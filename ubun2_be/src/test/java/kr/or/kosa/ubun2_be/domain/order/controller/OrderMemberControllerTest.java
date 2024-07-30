package kr.or.kosa.ubun2_be.domain.order.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.order.dto.*;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
import kr.or.kosa.ubun2_be.domain.order.service.SubscriptionOrderService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
class OrderMemberControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private OrderService orderService;

    @MockBean
    private SubscriptionOrderService subscriptionOrderService;

    private List<SubscriptionOrderRequest> requests;

    @BeforeEach
    void setUp() {
        SubscriptionOrderRequest subscriptionOrderRequest1 = new SubscriptionOrderRequest();
        subscriptionOrderRequest1.setCustomerId(1L);
        subscriptionOrderRequest1.setPaymentMethodId(1L);
        subscriptionOrderRequest1.setPaymentType("CARD");
        subscriptionOrderRequest1.setAddressId(1L);
        subscriptionOrderRequest1.setIntervalDays(0);

        SubscriptionOrderRequest subscriptionOrderRequest2 = new SubscriptionOrderRequest();
        subscriptionOrderRequest2.setCustomerId(1L);
        subscriptionOrderRequest2.setPaymentMethodId(1L);
        subscriptionOrderRequest2.setPaymentType("CARD");
        subscriptionOrderRequest2.setAddressId(1L);
        subscriptionOrderRequest2.setIntervalDays(7);

        SubscriptionOrderProductRequest subscriptionOrderProductRequest1 = new SubscriptionOrderProductRequest();
        subscriptionOrderProductRequest1.setPrice(10000);
        subscriptionOrderProductRequest1.setQuantity(1);
        subscriptionOrderProductRequest1.setProductId(1L);
        subscriptionOrderProductRequest1.setDiscount(0);

        subscriptionOrderRequest1.setSubscriptionOrderProducts(List.of(subscriptionOrderProductRequest1));
        subscriptionOrderRequest2.setSubscriptionOrderProducts(List.of(subscriptionOrderProductRequest1));

        requests = Arrays.asList(subscriptionOrderRequest1,subscriptionOrderRequest2);

    }

    @Test
    void validateOrders() throws Exception {
        mockMvc.perform(post("/api/members/orders/validate")
                        .with(user(member))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requests)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("유효성 검사 및 결제 확인 완료"));

        verify(orderService).validateAndPrepareOrder(eq(member.getUserId()), any(SubscriptionOrderRequest.class));
        verify(subscriptionOrderService).validateAndPrepareSubscriptionOrder(eq(member.getUserId()), anyList());
    }

    @Test
    void registerOrders() throws Exception {
        mockMvc.perform(post("/api/members/orders")
                        .with(user(member))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(requests)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).createSingleOrder(eq(member.getUserId()), any(SubscriptionOrderRequest.class));
        verify(subscriptionOrderService).createSubscriptionOrders(eq(member.getUserId()), anyList());

    }

    @Test
    @DisplayName("현재 로그인한 회원의 전체 주문 목록 조회")
    void getAllOrders() throws Exception {
        List<UnifiedOrderResponse> mockResponses = Arrays.asList(new UnifiedOrderResponse(), new UnifiedOrderResponse());
        when(orderService.getAllOrdersByMemberId(anyLong())).thenReturn(mockResponses);

        mockMvc.perform(get("/api/members/orders")
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).getAllOrdersByMemberId(eq(member.getUserId()));
    }

    @Test
    @DisplayName("현재 로그인한 회원의 단건 주문 상세 조회")
    void getSingleOrderDetail() throws Exception {
        Long orderId = 1L;
        OrderDetailResponse mockResponse = new OrderDetailResponse();
        when(orderService.getOrderByMemberIdAndOrderId(anyLong(), anyLong())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/members/orders/{order_id}", orderId)
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).getOrderByMemberIdAndOrderId(eq(member.getUserId()), eq(orderId));
    }

    @Test
    @DisplayName("현재 로그인한 회원의 정기 주문 상세 조회")
    void getSubscriptionOrderDetail() throws Exception {
        Long orderId = 1L;
        SubscriptionOrderDetailResponse mockResponse = new SubscriptionOrderDetailResponse();
        when(subscriptionOrderService.getSubscriptionOrderByMemberIdAndOrderId(anyLong(), anyLong())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/members/orders/subscription/{order_id}", orderId)
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(subscriptionOrderService).getSubscriptionOrderByMemberIdAndOrderId(eq(member.getUserId()), eq(orderId));
    }

    @Test
    @DisplayName("현재 로그인한 회원의 단건 주문 취소")
    void cancelOrder() throws Exception {
        CancelOrderRequest cancelOrderRequest = new CancelOrderRequest();
        cancelOrderRequest.setCustomerId(1L);
        cancelOrderRequest.setOrderId(2L);

        mockMvc.perform(post("/api/members/orders/cancel")
                        .with(user(member))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cancelOrderRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터."));

        verify(orderService).cancelOrder(eq(member.getUserId()), any(CancelOrderRequest.class));

    }

    @Test
    void removeSubscriptionOrderProduct() throws Exception {
        RemoveSubscriptionOrderProductRequest request = new RemoveSubscriptionOrderProductRequest();
        request.setOrderId(1L);
        request.setCustomerId(1L);
        request.setSubscriptionOrderProductIds(Arrays.asList(1L, 2L));

        mockMvc.perform(post("/api/members/orders/subscription/remove")
                        .with(user(member))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(subscriptionOrderService).removeSubscriptionOrderProducts(eq(member.getUserId()), any(RemoveSubscriptionOrderProductRequest.class));
    }
}