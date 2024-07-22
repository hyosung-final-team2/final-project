package kr.or.kosa.ubun2_be.domain.dashboard.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.dashboard.dto.*;
import kr.or.kosa.ubun2_be.domain.dashboard.service.DashboardService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/dashboard")
public class DashboardController {
    private final DashboardService dashboardService;
    private static final String SORT_DEFAULT = "createdAt";
    private static final int PAGE_SIZE = 9;


    @Operation(summary = "기간별 주문 목록 조회 (일반 주문 + 구독 주문)")
    @GetMapping("/orders/{start_date}/{end_date}")
    public ResponseDto<?> getOrders(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                    @PathVariable("start_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate startDate,
                                    @PathVariable("end_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDate endDate,
                                    @PageableDefault(size = PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable) {
        Page<UnifiedOrderResponse> orderResponseList = dashboardService.getUnifiedOrdersByDateRangeAndCustomerId(startDate, endDate, customUserDetails.getUserId(), pageable);
        return ResponseDto.ok(orderResponseList, "정상출력 데이터");
    }

    @Operation(summary = "상품 총 개수 조회 (전체/활성/비활성)")
    @GetMapping("/products/count")
    public ResponseDto<?> getProductCounts(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseDto.ok(dashboardService.getProductCounts(customUserDetails.getUserId()), "상품 개수를 성공적으로 조회했습니다.");
    }

    @Operation(summary = "고객이 관리하는 회원 수 조회")
    @GetMapping("/members/count")
    public ResponseDto<?> getMemberCounts(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        return ResponseDto.ok(dashboardService.getMemberCounts(customUserDetails.getUserId()), "회원 수를 성공적으로 조회했습니다.");
    }

    @Operation(summary = "상위 판매 상품 조회")
    @GetMapping("/top-selling/{start_date}/{end_date}")
    public ResponseDto<?> getTopSellingProducts(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable("start_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @PathVariable("end_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate,
            @RequestParam(defaultValue = "5") int limit) {

        List<TopSellingProductDto> topProducts = dashboardService.getTopSellingProducts(customUserDetails.getUserId(), startDate, endDate, limit);
        return ResponseDto.ok(topProducts, "상위 판매 상품을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "기간별 주소 목록 조회")
    @GetMapping("/addresses/{start_date}/{end_date}")
    public ResponseDto<?> getAddressesByDateRange(
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PathVariable("start_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @PathVariable("end_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<AddressesResponse> addresses = dashboardService.getAddressesByDateRange(customUserDetails.getUserId(), startDate, endDate);
        return ResponseDto.ok(addresses, "기간별 주소 목록을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "기간 동안의 주문 횟수와 총액 조회")
    @GetMapping("/orders/summary/{start_date}/{end_date}")
    public ResponseDto<?> getOrderSummary(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                          @PathVariable("start_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                          @PathVariable("end_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<OrderSummaryResponse> orderSummary = dashboardService.getOrderSummary(customUserDetails.getUserId(), startDate, endDate);
        return ResponseDto.ok(orderSummary, "기간 동안의 주문 횟수와 총액을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "기간 동안의 주문 횟수 조회")
    @GetMapping("/orders/count/{start_date}/{end_date}")
    public ResponseDto<?> getOrderCounts(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                         @PathVariable("start_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                         @PathVariable("end_date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        List<OrderCountResponse> orderCounts = dashboardService.getOrderCounts(customUserDetails.getUserId(), startDate, endDate);
        return ResponseDto.ok(orderCounts, "기간 동안의 주문 횟수를 성공적으로 조회했습니다.");
    }

}
