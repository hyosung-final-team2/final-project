package kr.or.kosa.ubun2_be.domain.dashboard.controller;

import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.dashboard.dto.*;
import kr.or.kosa.ubun2_be.domain.dashboard.service.DashboardService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class DashboardControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private DashboardService dashboardService;

    @Test
    @DisplayName("기간별 주문 목록 조회 (일반 주문 + 구독 주문)")
    void getOrders() throws Exception {
        LocalDate startDate = LocalDate.of(2023, 1, 1);
        LocalDate endDate = LocalDate.of(2023, 12, 31);
        List<UnifiedOrderResponse> mockResponse = Arrays.asList(new UnifiedOrderResponse(), new UnifiedOrderResponse());

        when(dashboardService.getUnifiedOrdersByDateRangeAndCustomerId(any(), any(), anyLong())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/customers/dashboard/orders/{start_date}/{end_date}", startDate, endDate)
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(dashboardService).getUnifiedOrdersByDateRangeAndCustomerId(eq(startDate), eq(endDate), eq(customer.getUserId()));
    }

    @Test
    @DisplayName("상품 총 개수 조회 (전체/활성/비활성)")
    void getProductCounts() throws Exception {
        when(dashboardService.getProductCounts(anyLong())).thenReturn(ProductCountResponseDto.of(100L, 80L, 20L));

        mockMvc.perform(get("/api/customers/dashboard/products/count")
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.totalCount").value(100))
                .andExpect(jsonPath("$.data.activeCount").value(80))
                .andExpect(jsonPath("$.data.inactiveCount").value(20))
                .andExpect(jsonPath("$.message").value("상품 개수를 성공적으로 조회했습니다."));

        verify(dashboardService).getProductCounts(eq(customer.getUserId()));
    }

    @Test
    @DisplayName("고객이 관리하는 회원 수 조회")
    void getMemberCounts() throws Exception {
        when(dashboardService.getMemberCounts(anyLong())).thenReturn(MemberCountResponseDto.of(50L,0L));

        mockMvc.perform(get("/api/customers/dashboard/members/count")
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("회원 수를 성공적으로 조회했습니다."));

        verify(dashboardService).getMemberCounts(eq(customer.getUserId()));
    }

    @Test
    @DisplayName("상위 판매 상품 조회")
    void getTopSellingProducts() throws Exception {
        LocalDate startDate = LocalDate.of(2023, 1, 1);
        LocalDate endDate = LocalDate.of(2023, 12, 31);
        List<TopSellingProductDto> mockResponse = Arrays.asList(
                TopSellingProductDto.of(1L,"Product A", 100L),
                TopSellingProductDto.of(2L,"Product B", 80L)
        );

        when(dashboardService.getTopSellingProducts(anyLong(), any(), any(), anyInt())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/customers/dashboard/top-selling/{start_date}/{end_date}", startDate, endDate)
                        .param("limit", "5")
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.message").value("상위 판매 상품을 성공적으로 조회했습니다."));

        verify(dashboardService).getTopSellingProducts(eq(customer.getUserId()), eq(startDate), eq(endDate), eq(5));
    }

    @Test
    @DisplayName("기간별 주소 목록 조회")
    void getAddressesByDateRange() throws Exception {
        LocalDate startDate = LocalDate.of(2023, 1, 1);
        LocalDate endDate = LocalDate.of(2023, 12, 31);
        List<AddressesResponse> mockResponse = Arrays.asList(
                AddressesResponse.of(Address.builder().address("Address 1").addressId(10L).build()),
                AddressesResponse.of(Address.builder().address("Address 2").addressId(5L).build()));

        when(dashboardService.getAddressesByDateRange(anyLong(), any(), any())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/customers/dashboard/addresses/{start_date}/{end_date}", startDate, endDate)
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].addressName").value("Address 1"))
                .andExpect(jsonPath("$.data[0].addressId").value(10))
                .andExpect(jsonPath("$.message").value("기간별 주소 목록을 성공적으로 조회했습니다."));

        verify(dashboardService).getAddressesByDateRange(eq(customer.getUserId()), eq(startDate), eq(endDate));
    }

    @Test
    @DisplayName("기간 동안의 주문 횟수와 총액 조회")
    void getOrderSummary() throws Exception {
        LocalDate startDate = LocalDate.of(2023, 1, 1);
        LocalDate endDate = LocalDate.of(2023, 12, 31);
        List<OrderSummaryResponse> mockResponse = Arrays.asList(
                OrderSummaryResponse.of(LocalDate.of(2023, 1, 1), 5L, 50000L,null,null),
                OrderSummaryResponse.of(LocalDate.of(2023, 1, 2), 3L, 30000L,null,null));

        when(dashboardService.getOrderSummary(anyLong(), any(), any())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/customers/dashboard/orders/summary/{start_date}/{end_date}", startDate, endDate)
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].date").value("2023-01-01"))
                .andExpect(jsonPath("$.data[0].orderCount").value(5))
                .andExpect(jsonPath("$.data[0].subscriptionOrderCount").value(50000))
                .andExpect(jsonPath("$.message").value("기간 동안의 주문 횟수와 총액을 성공적으로 조회했습니다."));

        verify(dashboardService).getOrderSummary(eq(customer.getUserId()), eq(startDate), eq(endDate));
    }

    @Test
    @DisplayName("기간 동안의 주문 횟수 조회")
    void getOrderCounts() throws Exception {
        LocalDate startDate = LocalDate.of(2023, 1, 1);
        LocalDate endDate = LocalDate.of(2023, 12, 31);
        List<OrderCountResponse> mockResponse = Arrays.asList(
                OrderCountResponse.of(5L,10L,LocalDate.of(2023, 1, 1)),
                OrderCountResponse.of(3L,7L,LocalDate.of(2023, 1, 2)));

        when(dashboardService.getOrderCounts(anyLong(), any(), any())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/customers/dashboard/orders/count/{start_date}/{end_date}", startDate, endDate)
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data[0].date").value("2023-01-01"))
                .andExpect(jsonPath("$.data[0].orderCount").value(5))
                .andExpect(jsonPath("$.message").value("기간 동안의 주문 횟수를 성공적으로 조회했습니다."));

        verify(dashboardService).getOrderCounts(eq(customer.getUserId()), eq(startDate), eq(endDate));
    }
}