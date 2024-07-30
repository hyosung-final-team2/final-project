package kr.or.kosa.ubun2_be.domain.customer.controller;

import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.customer.dto.CalendarRequest;
import kr.or.kosa.ubun2_be.domain.customer.dto.DailyOrderSummaryResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.MonthlySummaryResponse;
import kr.or.kosa.ubun2_be.domain.customer.service.CalendarService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

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
class CalendarControllerTest extends CommonTestSetup {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CalendarService calendarService;

    @BeforeEach
    void setUp() {
        CalendarRequest calendarRequest = new CalendarRequest();
        calendarRequest.setYear(2024);
        calendarRequest.setMonth(7);
    }

    @Test
    void getDailySalesForMonthAndCustomer() throws Exception {
        List<DailyOrderSummaryResponse> mockResponse = Arrays.asList(
                new DailyOrderSummaryResponse(),
                new DailyOrderSummaryResponse()
        );

        when(calendarService.getDailySalesForMonthAndCustomer(any(CalendarRequest.class), anyLong()))
                .thenReturn(mockResponse);

        mockMvc.perform(get("/api/calendar")
                        .param("year", "2024")
                        .param("month", "7")
                        .with(user(customUserDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.message").value("주문 데이터 "));

        verify(calendarService).getDailySalesForMonthAndCustomer(any(CalendarRequest.class), eq(customUserDetails.getUserId()));
    }

    @Test
    void getMonthlySummary() throws Exception {
        MonthlySummaryResponse mockResponse = new MonthlySummaryResponse();

        when(calendarService.getMonthlySummary(any(CalendarRequest.class), anyLong()))
                .thenReturn(mockResponse);

        mockMvc.perform(get("/api/calendar/summary")
                        .param("year", "2024")
                        .param("month", "7")
                        .with(user(customUserDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").exists())
                .andExpect(jsonPath("$.message").value("월간 요약 데이터 "));

        verify(calendarService).getMonthlySummary(any(CalendarRequest.class), eq(customUserDetails.getUserId()));
    }
}