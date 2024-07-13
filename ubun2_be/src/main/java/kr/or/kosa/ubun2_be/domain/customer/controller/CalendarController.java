package kr.or.kosa.ubun2_be.domain.customer.controller;

import kr.or.kosa.ubun2_be.domain.customer.dto.DailyOrderSummaryRequest;
import kr.or.kosa.ubun2_be.domain.customer.dto.DailyOrderSummaryResponse;
import kr.or.kosa.ubun2_be.domain.customer.service.CalendarService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class CalendarController {
    private final CalendarService calendarService;

    @GetMapping("/calendar")
    public ResponseDto<?> getDailySalesForMonthAndCustomer(@ModelAttribute DailyOrderSummaryRequest dailyOrderSummaryRequest, @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {
        List<DailyOrderSummaryResponse> dailySalesForMonthAndCustomer = calendarService.getDailySalesForMonthAndCustomer(dailyOrderSummaryRequest, customUserDetails.getUserId());
        return ResponseDto.ok(dailySalesForMonthAndCustomer,"주문 데이터 ");
    }
}
