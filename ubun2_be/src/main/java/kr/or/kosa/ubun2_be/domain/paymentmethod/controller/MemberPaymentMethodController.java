package kr.or.kosa.ubun2_be.domain.paymentmethod.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.*;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.MyAccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.MyCardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.service.PaymentMethodService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members/payments")
public class MemberPaymentMethodController {
    private final PaymentMethodService paymentMethodService;

    @Operation(summary = "회원의 결제비밀번호 존재 여부 확인")
    @GetMapping("/password")
    public ResponseDto<?> checkPaymentPassword(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        boolean hasPaymentPassword = paymentMethodService.hasPaymentPassword(customUserDetails.getUserId());
        return ResponseDto.ok(hasPaymentPassword, "결제비밀번호 존재 여부를 성공적으로 확인했습니다.");
    }

    @Operation(summary = "전체 카드 목록 조회")
    @GetMapping("/cards")
    public ResponseDto<?> getAllCardPaymentMethods(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        List<MyCardPaymentResponse> cardPaymentResponses = paymentMethodService.getMyCardPaymentMethods(customUserDetails.getUserId());
        return ResponseDto.ok(cardPaymentResponses, "카드 목록을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "전체 계좌 목록 조회")
    @GetMapping("/accounts")
    public ResponseDto<?> getAllAccountPaymentMethods(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        List<MyAccountPaymentResponse> accountPaymentResponses = paymentMethodService.getMyAccountPaymentMethods(customUserDetails.getUserId());
        return ResponseDto.ok(accountPaymentResponses, "계좌 목록을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "카드 상세 조회")
    @GetMapping("/cards/{paymentMethodId}")
    public ResponseDto<?> getCardPaymentMethod(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long paymentMethodId) {
        MyCardPaymentResponse cardPaymentResponse = paymentMethodService.getMyCardPaymentMethod(paymentMethodId, customUserDetails.getUserId());
        return ResponseDto.ok(cardPaymentResponse, "카드를 성공적으로 조회했습니다.");
    }

    @Operation(summary = "계좌 상세 조회")
    @GetMapping("/accounts/{paymentMethodId}")
    public ResponseDto<?> getAccountPaymentMethod(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long paymentMethodId) {
        System.out.println("paymentMethodId = " + paymentMethodId);
        MyAccountPaymentResponse accountPaymentResponse = paymentMethodService.getMyAccountPaymentMethod(paymentMethodId, customUserDetails.getUserId());
        return ResponseDto.ok(accountPaymentResponse, "계좌를 성공적으로 조회했습니다.");
    }

    @Operation(summary = "결제수단 등록")
    @PostMapping
    public ResponseDto<?> registerPaymentMethod(@AuthenticationPrincipal CustomUserDetails customUserDetails, @RequestBody RegisterPaymentMethodRequest registerPaymentMethodRequest) {
        paymentMethodService.registerPaymentMethod(registerPaymentMethodRequest, customUserDetails.getUserId());
        return ResponseDto.ok(null,"결제수단을 성공적으로 등록했습니다.");
    }

    @Operation(summary = "결제수단 수정")
    @PutMapping("/{paymentMethodId}")
    public ResponseDto<?> updatePaymentMethod(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long paymentMethodId, @RequestBody UpdatePaymentMethodRequest updatePaymentMethodRequest) {
        paymentMethodService.updatePaymentMethod(paymentMethodId, updatePaymentMethodRequest, customUserDetails.getUserId());
        return ResponseDto.ok(null,"결제수단을 성공적으로 수정했습니다.");
    }

    @Operation(summary = "결제수단 삭제")
    @DeleteMapping("/{paymentMethodId}")
    public ResponseDto<?> deletePaymentMethod(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long paymentMethodId) {
        paymentMethodService.deleteMyPaymentMethod(paymentMethodId, customUserDetails.getUserId());
        return ResponseDto.ok(null,"결제수단을 성공적으로 삭제했습니다.");
    }

}
