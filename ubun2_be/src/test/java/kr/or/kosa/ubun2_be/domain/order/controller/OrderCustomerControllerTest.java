package kr.or.kosa.ubun2_be.domain.order.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.domain.address.controller.TestSecurityConfig;
import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.dto.UnifiedOrderResponse;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
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

    private List<UnifiedOrderResponse> orderResponses;

    @BeforeEach
    void setUp() {
        orderResponses = Arrays.asList(
                createOrderResponse(1L, "APPROVED", "2024-01-01T13:00", "김철수", "CARD", 35000, false),
                createOrderResponse(1L, "APPROVED", "2024-01-01T13:00", "김철수", "CARD", 35000, true)
        );
    }

    private UnifiedOrderResponse createOrderResponse(Long orderId, String orderStatus, String createdAt, String memberName, String paymentType, int totalOrderPrice, boolean isSubscription) {
        return new UnifiedOrderResponse(
                orderId,
                orderStatus,
                createdAt,
                memberName,
                paymentType,
                totalOrderPrice,
                isSubscription
        );
    }

    @Test
    @DisplayName("주문 목록을 페이지네이션과 함께 조회한다")
    void findOrders() throws Exception {
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
                .andExpect(jsonPath("$.data.content.length()").value(2)) // 데이터가 2개만 들어있음
                .andExpect(jsonPath("$.data.content[0].orderId").value(1))
                .andExpect(jsonPath("$.data.content[0].orderStatus").value("APPROVED"))
                .andExpect(jsonPath("$.data.content[0].memberName").value("김철수"))
                .andExpect(jsonPath("$.data.content[0].paymentType").value("CARD"))
                .andExpect(jsonPath("$.data.content[0].totalOrderPrice").value(35000))
                .andExpect(jsonPath("$.data.content[0].subscription").value(false))
                .andExpect(jsonPath("$.data.totalElements").value(2)) // 데이터가 2개만 들어있음
                .andExpect(jsonPath("$.data.totalPages").value(1))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(orderService).getOrders(eq(customerId), any(SearchRequest.class), any(PageRequest.class));
    }
}
