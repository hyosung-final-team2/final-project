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

}
