package kr.or.kosa.ubun2_be.domain.cart.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartProductDeleteRequest;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartProductUpdateRequest;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartRequest;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartResponse;
import kr.or.kosa.ubun2_be.domain.cart.service.CartService;
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
@RequestMapping("/members")
public class CartController {

    private final CartService cartService;

    private static final int PAGE_SIZE = 9;
    private static final String SORT_DEFAULT = "cartId";

    @Operation(summary = "장바구니 생성")
    @PostMapping("/carts")
    public ResponseDto<?> registerCarts(@RequestBody List<CartRequest> cartRequests,
                                        @AuthenticationPrincipal CustomUserDetails customerUserDetails) {
        cartService.createCarts(customerUserDetails.getUserId(), cartRequests);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

    @Operation(summary = "전체 상점 통합 장바구니 조회")
    @GetMapping("/carts")
    public ResponseDto<?> getCarts(@AuthenticationPrincipal CustomUserDetails customerUserDetails, @PageableDefault(size = PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable) {
        Page<CartResponse> cartResponseList = cartService.getCarts(customerUserDetails.getUserId(), pageable);
        return ResponseDto.ok(cartResponseList, "정상출력 데이터");
    }

    @Operation(summary = "장바구니 수량 업데이트")
    @PutMapping("/carts")
    public ResponseDto<?> updateCartProductQuantities(@RequestBody List<CartProductUpdateRequest> cartProductUpdateRequests,
                                                      @AuthenticationPrincipal CustomUserDetails customerUserDetails) {
        cartService.updateCartProductQuantities(customerUserDetails.getUserId(), cartProductUpdateRequests);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

}
