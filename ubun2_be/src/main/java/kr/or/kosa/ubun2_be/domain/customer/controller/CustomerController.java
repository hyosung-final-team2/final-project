package kr.or.kosa.ubun2_be.domain.customer.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.customer.dto.SignupRequest;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/customers")
public class CustomerController {

    private final CustomerService customerService;

    @Operation(summary = "고객 회원가입")
    @PostMapping("/signup")
    public ResponseDto<?> signupCustomer(@RequestBody SignupRequest signupRequest) {
        customerService.createCustomer(signupRequest);
        return ResponseDto.ok(null, "고객 회원가입 정상 완료");
    }
}
