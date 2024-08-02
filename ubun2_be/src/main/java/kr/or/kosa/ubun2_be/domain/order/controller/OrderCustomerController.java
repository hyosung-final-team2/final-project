package kr.or.kosa.ubun2_be.domain.order.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import kr.or.kosa.ubun2_be.domain.order.dto.*;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
import kr.or.kosa.ubun2_be.domain.order.service.SubscriptionOrderService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customers/orders")
public class OrderCustomerController {

    private final SubscriptionOrderService subscriptionOrderService;
    private final OrderService orderService;
    private static final String SORT_DEFAULT = "createdAt";
    private static final int PAGE_SIZE = 9;

    @Operation(summary = "전체 주문 목록 조회 (일반 주문 + 구독 주문)")
    @GetMapping("/")
    public ResponseDto<?> getOrders(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                    SearchRequest searchRequest,
                                    @PageableDefault(size = PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable) {
        Page<UnifiedOrderResponse> orderResponseList = orderService.getOrders(customUserDetails.getUserId(), searchRequest, pageable);
        return ResponseDto.ok(orderResponseList, "정상출력 데이터");
    }

    @Operation(summary = "단건 주문 상세 조회")
    @GetMapping("/{order_id}")
    public ResponseDto<?> getOrderByOrderId(@PathVariable("order_id") Long orderId,
                                            @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        OrderDetailResponse orderDetailResponse = orderService.getOrderByCustomerIdAndOrderId(orderId, customUserDetails.getUserId());
        return ResponseDto.ok(orderDetailResponse, "정상출력 데이터");
    }

    @Operation(summary = "정기 주문 상세 조회")
    @GetMapping("/subscription/{order_id}")
    public ResponseDto<?> getSubscriptionOrderByOrderId(@PathVariable("order_id") Long orderId,
                                                        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        SubscriptionOrderDetailResponse response =subscriptionOrderService.getSubscriptionOrderByCustomerIdAndOrderId(orderId, customUserDetails.getUserId());
        return ResponseDto.ok(response, "정상출력 데이터");
    }

    @Operation(summary = "전체 주문 대기 목록 조회 (일반 단건 주문 + 구독 주문)")
    @GetMapping("/pending")
    public ResponseDto<?> getPendingOrders(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                           SearchRequest searchRequest,
                                           @PageableDefault(size = PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable) {

        Page<UnifiedOrderResponse> orderResponseList = orderService.getPendingOrders(customUserDetails.getUserId(), searchRequest, pageable);
        return ResponseDto.ok(orderResponseList, "정상출력 데이터");
    }

    @Operation(summary = "대기 단건 주문 리스트 승인, 취소")
    @PutMapping("/approve")
    public ResponseDto<?> updateOrderStatus(@Valid @RequestBody List<OrderApproveRequest> orderApproveRequests,
                                             @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        orderService.updateOrderStatus(customUserDetails.getUserId(), orderApproveRequests);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

    @Operation(summary = "대기 정기 주문(최초 정기주문만) 리스트 승인, 취소")
    @PutMapping("/subscription/approve")
    public ResponseDto<?> updateSubscriptionOrderStatus(@Valid @RequestBody List<SubscriptionApproveRequest> subscriptionApproveRequests,
                                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        orderService.updateSubscriptionOrderStatus(customUserDetails.getUserId(), subscriptionApproveRequests);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

}