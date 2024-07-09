package kr.or.kosa.ubun2_be.domain.order.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.order.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.order.dto.UnifiedOrderResponse;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customers/orders")
public class OrderCustomerController {
    private final OrderService orderService;
    private static final String SORT_DEFAULT = "createdAt";


    private static final int PAGE_SIZE = 9;

    @Operation(summary = "전체 주문 목록 조회 (일반 주문 + 구독 주문)")
    @GetMapping("/")
    public ResponseDto<?> findOrders(
            @RequestParam("customerId") Long customerId,
            SearchRequest searchRequest,
            @PageableDefault(size = PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable) {

        Page<UnifiedOrderResponse> orderResponseList = orderService.getOrders(customerId, searchRequest, pageable);
        return ResponseDto.ok(orderResponseList, "정상출력 데이터");
    }



}