package kr.or.kosa.ubun2_be.domain.order.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.order.dto.*;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
import kr.or.kosa.ubun2_be.domain.order.service.SubscriptionOrderService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class OrderMemberController {

    private final SubscriptionOrderService subscriptionOrderService;
    private final OrderService orderService;

    @Operation(summary = "정기 주문 및 단건 주문 생성")
    @PostMapping("/orders")
    public ResponseDto<?> registerOrders(@RequestBody List<SubscriptionOrderRequest> subscriptionOrderRequests,
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

    @Operation(summary = "현재 로그인한 회원의 전체 주문 목록 조회")
    @GetMapping("/orders")
    public ResponseDto<List<UnifiedOrderResponse>> getAllOrders(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        List<UnifiedOrderResponse> allOrders = orderService.getAllOrdersByMemberId(customUserDetails.getUserId());
        return ResponseDto.ok(allOrders, "정상출력 데이터");
    }

    @Operation(summary = "현재 로그인한 회원의 단건 주문 상세 조회")
    @GetMapping("/orders/{customer_id}/{order_id}")
    public ResponseDto<?> getSingleOrderDetail(@PathVariable("customer_id") Long customerId,
                                               @PathVariable("order_id") Long orderId,
                                               @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        OrderDetailResponse orderDetailResponse = orderService.getOrderByMemberIdAndOrderId(customUserDetails.getUserId(), customerId, orderId);
        return ResponseDto.ok(orderDetailResponse, "정상출력 데이터");
    }

    @Operation(summary = "현재 로그인한 회원의 정기 주문 상세 조회")
    @GetMapping("/orders/subscription/{customer_id}/{order_id}")
    public ResponseDto<?> getSubscriptionOrderDetail(@PathVariable("customer_id") Long customerId,
                                                     @PathVariable("order_id") Long orderId,
                                                     @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        SubscriptionOrderDetailResponse subscriptionOrderDetailResponse = subscriptionOrderService.getSubscriptionOrderByMemberIdAndOrderId(customUserDetails.getUserId(), customerId, orderId);
        return ResponseDto.ok(subscriptionOrderDetailResponse, "정상출력 데이터");
    }

    @Operation(summary = "현재 로그인한 회원의 단건 주문 취소")
    @PostMapping("/orders/cancel")
    public ResponseDto<?> cancelOrder(@RequestBody CancelOrderRequest cancelOrderRequest,
                                      @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        orderService.cancelOrder(customUserDetails.getUserId(), cancelOrderRequest);
        return ResponseDto.ok(null, "정상출력 데이터.");
    }

    @Operation(summary = "정기 주문에서 특정 상품 제거")
    @PostMapping("/orders/subscription/remove")
    public ResponseDto<?> removeSubscriptionOrderProduct(@RequestBody RemoveSubscriptionOrderProductRequest request,
                                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        subscriptionOrderService.removeSubscriptionOrderProducts(customUserDetails.getUserId(), request);
        return ResponseDto.ok(null, "정상출력 데이터");
    }


}
