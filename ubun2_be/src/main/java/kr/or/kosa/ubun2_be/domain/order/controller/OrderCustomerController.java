package kr.or.kosa.ubun2_be.domain.order.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.order.dto.OrderResponse;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customers/orders")
public class OrderCustomerController {
    private final OrderService orderService;

    private static final int PAGE_SIZE = 9;

    @Operation(summary = "전체 단건 주문 목록 조회")
    @GetMapping("/")
    public ResponseDto<?> findOrders(@RequestParam("customerId") Long customerId, @PageableDefault(size = PAGE_SIZE, sort = "orderId", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<OrderResponse> orderResponseList = orderService.getOrders(customerId, pageable);
        return ResponseDto.ok(orderResponseList, "정상출력 데이터");
    }

}