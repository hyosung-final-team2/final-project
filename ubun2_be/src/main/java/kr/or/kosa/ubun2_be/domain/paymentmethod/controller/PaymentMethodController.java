package kr.or.kosa.ubun2_be.domain.paymentmethod.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDeleteRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.service.PaymentMethodService;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
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
@RequestMapping("/api/customers/payments")
public class PaymentMethodController {
    private final PaymentMethodService paymentMethodService;
    private static final int PAGE_SIZE = 9;

    @Operation(summary = "카드결제수단을 전체 조회.")
    @GetMapping("/cards")
    public ResponseDto<?> getCardPaymentMethods(@PageableDefault(size = PAGE_SIZE, sort = "paymentMethodId", direction = Sort.Direction.DESC) Pageable pageable, SearchRequest searchRequest ,@AuthenticationPrincipal CustomUserDetails userDetails) {
        Page<CardPaymentResponse> paymentMethods = paymentMethodService.getAllCardPaymentMethodsForMember(pageable, searchRequest,userDetails.getUserId());
        return ResponseDto.ok(paymentMethods, "카드 목록을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "계좌결제수단을 전체 조회.")
    @GetMapping("/accounts")
    public ResponseDto<?> getAccountPaymentMethods(@PageableDefault(size = PAGE_SIZE, sort = "paymentMethodId", direction = Sort.Direction.DESC) Pageable pageable, SearchRequest searchRequest, @AuthenticationPrincipal CustomUserDetails userDetails) {
        Page<AccountPaymentResponse> paymentMethods = paymentMethodService.getAllAccountPaymentMethodsForMember(pageable, searchRequest,userDetails.getUserId());
        return ResponseDto.ok(paymentMethods, "계좌 목록을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "결제수단 아이디로 회원 상세 조회")
    @GetMapping("/{payment_method_id}")
    public ResponseDto<?> getPaymentMethodDetailByMemberId(@PathVariable("payment_method_id") Long paymentMethodId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        PaymentMethodDetailResponse response = paymentMethodService.getPaymentMethodDetailByMemberId(paymentMethodId, userDetails.getUserId());
        return ResponseDto.ok(response, "결제수단 상세를 성공적으로 조회했습니다.");
    }

    @Operation(summary = "회원의 결제수단 등록")
    @PostMapping(value = "/")
    public ResponseDto<?> addPaymentMethod(@RequestBody PaymentMethodRequest paymentMethodRequest, @AuthenticationPrincipal CustomUserDetails userDetails) {
        paymentMethodService.addPaymentMethod(paymentMethodRequest, userDetails.getUserId());
        return ResponseDto.ok(null, "결제 수단이 성공적으로 등록되었습니다.");
    }

    @Operation(summary = "회원의 결제수단 삭제")
    @DeleteMapping(value = "/{payment_method_id}")
    public ResponseDto<?> deletePayment(@PathVariable("payment_method_id") Long paymentMethodId, @AuthenticationPrincipal CustomUserDetails userDetails) {
        paymentMethodService.deletePaymentMethod(paymentMethodId, userDetails.getUserId());
        return ResponseDto.ok(null, "주소가 성공적으로 삭제되었습니다.");
    }

    @Operation(summary = "회원의 결제수단 삭제")
    @DeleteMapping( "/selected")
    public ResponseDto<?> deleteSelectedPayment(@RequestBody List<PaymentMethodDeleteRequest> paymentMethodDeleteRequestList, @AuthenticationPrincipal CustomUserDetails userDetails) {
        paymentMethodService.deleteSelectedPaymentMethod(paymentMethodDeleteRequestList, userDetails.getUserId());
        return ResponseDto.ok(null, "주소가 성공적으로 삭제되었습니다.");
    }

}
