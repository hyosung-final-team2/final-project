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
@RequestMapping("/api/members")
public class OrderMemberController {

    private final SubscriptionOrderService subscriptionOrderService;
    private final OrderService orderService;
    private static final int PAGE_SIZE = 9;
    private static final String SORT_DEFAULT = "createdAt";

    @Operation(summary = "정기 주문 및 단건 주문 유효성 검사 및 결제 확인")
    @PostMapping("/orders/validate")
    public ResponseDto<?> validateOrders(@Valid @RequestBody List<SubscriptionOrderRequest> orderRequests,
                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        for (SubscriptionOrderRequest orderRequest : orderRequests) {
            if (orderRequest.getIntervalDays() == 0) {
                orderService.validateAndPrepareOrder(customUserDetails.getUserId(), orderRequest);
            } else {
                subscriptionOrderService.validateAndPrepareSubscriptionOrder(customUserDetails.getUserId(), List.of(orderRequest));
            }
        }
        return ResponseDto.ok(null, "유효성 검사 및 결제 확인 완료");
    }

    @Operation(summary = "정기 주문 및 단건 주문 생성")
    @PostMapping("/orders")
    public ResponseDto<?> registerOrders(@Valid @RequestBody List<SubscriptionOrderRequest> subscriptionOrderRequests,
                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        for (SubscriptionOrderRequest orderRequest : subscriptionOrderRequests) {
            if (orderRequest.getIntervalDays() == 0) {
                orderService.createSingleOrder(customUserDetails.getUserId(), orderRequest);
            } else {
                subscriptionOrderService.createSubscriptionOrders(customUserDetails.getUserId(), List.of(orderRequest));
            }
        }
        return ResponseDto.ok(null, "정상출력 데이터");
    }


    @Operation(summary = "현재 로그인한 회원의 전체 주문 상태 조회")
    @GetMapping("/orders/status")
    public ResponseDto<OrderStatusSummaryResponse> getOrderStatusSummary(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Long memberId = customUserDetails.getUserId();
        OrderStatusSummaryResponse summaryResponse = orderService.getOrderStatusSummaryByMemberId(memberId);
        return ResponseDto.ok(summaryResponse, "정상 출력 데이터");
    }

    @Operation(summary = "현재 로그인한 회원의 단건 주문 목록 조회")
    @GetMapping("/orders/single")
    public ResponseDto<Page<UnifiedOrderResponse>> getAllSingleOrders(
            @ModelAttribute OrderPeriodFilterRequest orderPeriodFilterRequest,
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PageableDefault(size = PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable) {
        Page<UnifiedOrderResponse> orders = orderService.getAllSingleOrdersByMemberId(
                orderPeriodFilterRequest,
                customUserDetails.getUserId(),
                pageable
        );
        return ResponseDto.ok(orders, "정상 출력 데이터");
    }

    @Operation(summary = "현재 로그인한 회원의 정기 주문 목록 조회")
    @GetMapping("/orders/subscription")
    public ResponseDto<Page<UnifiedOrderResponse>> getAllSubscriptionOrders(
            @ModelAttribute OrderPeriodFilterRequest orderPeriodFilterRequest,
            @AuthenticationPrincipal CustomUserDetails customUserDetails,
            @PageableDefault(size = PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable) {
        Page<UnifiedOrderResponse> orders = subscriptionOrderService.getAllSubscriptionOrdersByMemberId(
                orderPeriodFilterRequest,
                customUserDetails.getUserId(),
                pageable
        );
        return ResponseDto.ok(orders, "정상 출력 데이터");
    }

    @Operation(summary = "현재 로그인한 회원의 단건 주문 상세 조회")
    @GetMapping("/orders/{order_id}")
    public ResponseDto<?> getSingleOrderDetail(@PathVariable("order_id") Long orderId,
                                               @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        OrderDetailResponse orderDetailResponse = orderService.getOrderByMemberIdAndOrderId(customUserDetails.getUserId(), orderId);
        return ResponseDto.ok(orderDetailResponse, "정상출력 데이터");
    }

    @Operation(summary = "현재 로그인한 회원의 정기 주문 상세 조회")
    @GetMapping("/orders/subscription/{order_id}")
    public ResponseDto<?> getSubscriptionOrderDetail(@PathVariable("order_id") Long orderId,
                                                     @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        SubscriptionOrderDetailResponse subscriptionOrderDetailResponse = subscriptionOrderService.getSubscriptionOrderByMemberIdAndOrderId(customUserDetails.getUserId(), orderId);
        return ResponseDto.ok(subscriptionOrderDetailResponse, "정상출력 데이터");
    }

    @Operation(summary = "현재 로그인한 회원의 단건 주문 취소")
    @PostMapping("/orders/cancel")
    public ResponseDto<?> cancelOrder(@Valid @RequestBody CancelOrderRequest cancelOrderRequest,
                                      @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        orderService.cancelOrder(customUserDetails.getUserId(), cancelOrderRequest);
        return ResponseDto.ok(null, "정상출력 데이터.");
    }

    @Operation(summary = "정기 주문에서 특정 상품 제거")
    @PostMapping("/orders/subscription/remove")
    public ResponseDto<?> removeSubscriptionOrderProduct(@Valid @RequestBody RemoveSubscriptionOrderProductRequest request,
                                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        subscriptionOrderService.removeSubscriptionOrderProducts(customUserDetails.getUserId(), request);
        return ResponseDto.ok(null, "정상출력 데이터");
    }
}
