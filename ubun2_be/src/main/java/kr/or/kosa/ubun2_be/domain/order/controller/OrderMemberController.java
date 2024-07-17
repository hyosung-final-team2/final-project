package kr.or.kosa.ubun2_be.domain.order.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderRequest;
import kr.or.kosa.ubun2_be.domain.order.service.SubscriptionOrderService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class OrderMemberController {

    private final SubscriptionOrderService subscriptionOrderService;

    @Operation(summary = "정기 주문 생성")
    @PostMapping("/orders")
    public ResponseDto<?> registerOrders(@RequestBody List<SubscriptionOrderRequest> subscriptionOrderRequests,
                                                        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        subscriptionOrderService.createSubscriptionOrders(customUserDetails.getUserId(), subscriptionOrderRequests);
        return ResponseDto.ok(null, "정상출력 데이터");
    }
}
