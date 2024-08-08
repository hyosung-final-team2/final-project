package kr.or.kosa.ubun2_be.domain.customer.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import kr.or.kosa.ubun2_be.domain.customer.dto.CalendarRequest;
import kr.or.kosa.ubun2_be.domain.customer.dto.DailyOrderSummaryResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.MonthlySummaryResponse;
import kr.or.kosa.ubun2_be.domain.customer.service.CalendarService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class CalendarController {
    private final CalendarService calendarService;

    @Operation(summary = "캘린더 판매현황 조회")
    @GetMapping("/calendar")
    public ResponseDto<?> getDailySalesForMonthAndCustomer(@Valid @ModelAttribute CalendarRequest calendarRequest, @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {
        List<DailyOrderSummaryResponse> dailySalesForMonthAndCustomer = calendarService.getDailySalesForMonthAndCustomer(calendarRequest, customUserDetails.getUserId());
        return ResponseDto.ok(dailySalesForMonthAndCustomer, "주문 데이터 ");
    }

    @Operation(summary = "월간 요약 조회")
    @GetMapping("/calendar/summary")
    public ResponseDto<?> getMonthlySummary(@Valid @ModelAttribute CalendarRequest calendarRequest, @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {
        MonthlySummaryResponse monthlySummary = calendarService.getMonthlySummary(calendarRequest, customUserDetails.getUserId());
        return ResponseDto.ok(monthlySummary, "월간 요약 데이터 ");
    }

}
