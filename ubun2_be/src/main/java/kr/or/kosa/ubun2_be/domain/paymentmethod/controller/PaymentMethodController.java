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
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customers/payments")
public class PaymentMethodController {
    private final PaymentMethodService paymentMethodService;
    private static final int PAGE_SIZE = 9;

    @Operation(summary = "카드결제수단을 전체 조회.")
    @GetMapping("/cards")
    public ResponseDto<?> getCardPaymentMethods(@RequestParam Long memberId, @PageableDefault(size = PAGE_SIZE, sort = "paymentMethodId", direction = Sort.Direction.DESC) Pageable pageable) {
        CardPaymentRequest request = CardPaymentRequest.builder().memberId(memberId).build();
        Page<CardPaymentResponse> paymentMethods = paymentMethodService.getAllCardPaymentMethodsForMember(request, pageable);
        return ResponseDto.ok(paymentMethods, "카드 목록을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "계좌결제수단을 전체 조회.")
    @GetMapping("/accounts")
    public ResponseDto<?> getAccountPaymentMethods(@RequestParam Long memberId, @PageableDefault(size = PAGE_SIZE, sort = "paymentMethodId", direction = Sort.Direction.DESC) Pageable pageable) {
        AccountPaymentRequest request = AccountPaymentRequest.builder().memberId(memberId).build();
        Page<AccountPaymentResponse> paymentMethods = paymentMethodService.getAllAccountPaymentMethodsForMember(request, pageable);
        return ResponseDto.ok(paymentMethods, "계좌 목록을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "결제수단 아이디로 회원 상세 조회")
    @GetMapping("/{payment_method_id}")
    public ResponseDto<?> getPaymentMethodDetailByMemberId(@PathVariable("payment_method_id") Long paymentMethodId) {
        PaymentMethodDetailRequest paymentMethodDetailRequest = PaymentMethodDetailRequest.builder().paymentMethodId(paymentMethodId).build();
        PaymentMethodDetailResponse response = paymentMethodService.getPaymentMethodDetailByMemberId(paymentMethodDetailRequest);
        return ResponseDto.ok(response, "결제수단 상세를 성공적으로 조회했습니다.");
    }

    @Operation(summary = "회원의 결제수단 등록")
    @PostMapping(value = "/", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<?> addPaymentMethod(@RequestBody PaymentMethodRequest paymentMethodRequest) {
        paymentMethodService.addPaymentMethod(paymentMethodRequest);
        return ResponseDto.ok(null, "결제 수단이 성공적으로 등록되었습니다.");
    }

    @Operation(summary = "회원의 결제수단 수정")
    @PutMapping(value = "/{payment_method_id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<?> updatePayment(@PathVariable("payment_method_id") Long paymentMethodId, @RequestBody PaymentMethodRequest paymentMethodRequest) {
        paymentMethodService.updatePaymentMethod(paymentMethodId, paymentMethodRequest);
        return ResponseDto.ok(null, "결제수단이 성공적으로 수정되었습니다.");
    }

    @Operation(summary = "회원의 결제수단 삭제")
    @DeleteMapping(value = "/{payment_method_id}")
    public ResponseDto<?> deletePayment(@PathVariable("payment_method_id") Long paymentMethodId) {
        paymentMethodService.deletePaymentMethod(paymentMethodId);
        return ResponseDto.ok(null, "주소가 성공적으로 삭제되었습니다.");
    }

}
