package kr.or.kosa.ubun2_be.domain.paymentmethod.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.service.PaymentMethodService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customers/payments")
public class PaymentMethodController {
    private final PaymentMethodService paymentMethodService;
    private static final int PAGE_SIZE = 9;

    @Operation(summary = "카드결제수단을 전체 조회.")
    @GetMapping("/cards")
    public ResponseDto<?> getCardPaymentMethods(@RequestParam Long memberId, @PageableDefault(size = PAGE_SIZE, sort = "paymentMethodId", direction = Sort.Direction.DESC) Pageable pageable, @AuthenticationPrincipal CustomUserDetails userDetails) {
        CardPaymentRequest request = CardPaymentRequest.builder().memberId(memberId).build();
        Page<CardPaymentResponse> paymentMethods = paymentMethodService.getAllCardPaymentMethodsForMember(request, pageable, userDetails.getUserId());
        return ResponseDto.ok(paymentMethods, "카드 목록을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "계좌결제수단을 전체 조회.")
    @GetMapping("/accounts")
    public ResponseDto<?> getAccountPaymentMethods(@RequestParam Long memberId, @PageableDefault(size = PAGE_SIZE, sort = "paymentMethodId", direction = Sort.Direction.DESC) Pageable pageable, @AuthenticationPrincipal CustomUserDetails userDetails) {
        AccountPaymentRequest request = AccountPaymentRequest.builder().memberId(memberId).build();
        Page<AccountPaymentResponse> paymentMethods = paymentMethodService.getAllAccountPaymentMethodsForMember(request, pageable, userDetails.getUserId());
        return ResponseDto.ok(paymentMethods, "계좌 목록을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "결제수단 아이디로 회원 상세 조회")
    @GetMapping("/{payment_method_id}")
    public ResponseDto<?> getPaymentMethodDetailByMemberId(@PathVariable("payment_method_id") Long paymentMethodId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        PaymentMethodDetailRequest paymentMethodDetailRequest = PaymentMethodDetailRequest.builder().paymentMethodId(paymentMethodId).build();
        PaymentMethodDetailResponse response = paymentMethodService.getPaymentMethodDetailByMemberId(paymentMethodDetailRequest, userDetails.getUserId());
        return ResponseDto.ok(response, "결제수단 상세를 성공적으로 조회했습니다.");
    }

    @Operation(summary = "회원의 결제수단 등록")
    @PostMapping(value = "/")
    public ResponseDto<?> addPaymentMethod(@RequestBody PaymentMethodRequest paymentMethodRequest, @AuthenticationPrincipal CustomUserDetails userDetails) {
        paymentMethodService.addPaymentMethod(paymentMethodRequest, userDetails.getUserId());
        return ResponseDto.ok(null, "결제 수단이 성공적으로 등록되었습니다.");
    }

    @Operation(summary = "회원의 결제수단 수정")
    @PutMapping(value = "/{payment_method_id}")
    public ResponseDto<?> updatePayment(@PathVariable("payment_method_id") Long paymentMethodId, @RequestBody PaymentMethodRequest paymentMethodRequest, @AuthenticationPrincipal CustomUserDetails userDetails) {
        paymentMethodService.updatePaymentMethod(paymentMethodId, paymentMethodRequest, userDetails.getUserId());
        return ResponseDto.ok(null, "결제수단이 성공적으로 수정되었습니다.");
    }

    @Operation(summary = "회원의 결제수단 삭제")
    @DeleteMapping(value = "/{payment_method_id}")
    public ResponseDto<?> deletePayment(@PathVariable("payment_method_id") Long paymentMethodId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        paymentMethodService.deletePaymentMethod(paymentMethodId, userDetails.getUserId());
        return ResponseDto.ok(null, "주소가 성공적으로 삭제되었습니다.");
    }

}
