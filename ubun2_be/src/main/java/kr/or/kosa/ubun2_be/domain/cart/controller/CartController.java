package kr.or.kosa.ubun2_be.domain.cart.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartRequest;
import kr.or.kosa.ubun2_be.domain.cart.service.CartService;
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
public class CartController {

    private final CartService cartService;

    @Operation(summary = "장바구니 생성")
    @PostMapping("/carts")
    public ResponseDto<?> registerCarts(@RequestBody List<CartRequest> cartRequests,
                                        @AuthenticationPrincipal CustomUserDetails customerUserDetails) {
        cartService.createCarts(customerUserDetails.getUserId(), cartRequests);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

}
