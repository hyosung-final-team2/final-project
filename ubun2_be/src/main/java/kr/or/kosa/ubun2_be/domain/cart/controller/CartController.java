package kr.or.kosa.ubun2_be.domain.cart.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartProductDeleteRequest;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartProductUpdateRequest;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartRequest;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartResponse;
import kr.or.kosa.ubun2_be.domain.cart.service.CartService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class CartController {

    private final CartService cartService;

    @Operation(summary = "장바구니 생성")
    @PostMapping("/carts")
    public ResponseDto<?> registerCarts(@Valid @RequestBody List<CartRequest> cartRequests,
                                        @AuthenticationPrincipal CustomUserDetails customerUserDetails) {
        cartService.createCarts(customerUserDetails.getUserId(), cartRequests);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

    @Operation(summary = "전체 상점 통합 장바구니 조회")
    @GetMapping("/carts")
    public ResponseDto<?> getCarts(@AuthenticationPrincipal CustomUserDetails customerUserDetails) {
        List<CartResponse> cartResponseList = cartService.getCarts(customerUserDetails.getUserId());
        return ResponseDto.ok(cartResponseList, "정상출력 데이터");
    }

    @Operation(summary = "장바구니 수량 업데이트")
    @PutMapping("/carts")
    public ResponseDto<?> updateCartProductQuantities(@Valid @RequestBody List<CartProductUpdateRequest> cartProductUpdateRequests,
                                                      @AuthenticationPrincipal CustomUserDetails customerUserDetails) {
        cartService.updateCartProductQuantities(customerUserDetails.getUserId(), cartProductUpdateRequests);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

    @Operation(summary = "장바구니 제품 삭제")
    @DeleteMapping("/carts")
    public ResponseDto<?> deleteCartProducts(@Valid @RequestBody List<CartProductDeleteRequest> cartProductDeleteRequests,
                                             @AuthenticationPrincipal CustomUserDetails customerUserDetails) {
        cartService.deleteCartProducts(customerUserDetails.getUserId(), cartProductDeleteRequests);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

}
