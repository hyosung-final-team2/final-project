package kr.or.kosa.ubun2_be.domain.order.controller;

import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderRequest;
import kr.or.kosa.ubun2_be.domain.order.service.impl.SubscriptionOrderServiceImpl;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
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

    private final SubscriptionOrderServiceImpl subscriptionOrderServiceImpl;

    @PostMapping("/orders")
    public void registerOrders(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody List<SubscriptionOrderRequest> subscriptionOrderRequests) {
        subscriptionOrderServiceImpl.createSubscriptionOrders(customUserDetails.getUserId(), subscriptionOrderRequests);
    }
}
