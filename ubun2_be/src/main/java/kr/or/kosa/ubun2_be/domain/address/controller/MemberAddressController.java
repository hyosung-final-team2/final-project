package kr.or.kosa.ubun2_be.domain.address.controller;


import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressRequest;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import kr.or.kosa.ubun2_be.domain.member.dto.MyAddressResponse;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members/addresses")
public class MemberAddressController {
    private final AddressService addressService;

    @Operation(summary = "회원 주소지 조회")
    @GetMapping("/")
    public ResponseDto<?> getAddresses(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        List<MyAddressResponse> addresses = addressService.getAddressesByMemberId(customUserDetails.getUserId());
        return ResponseDto.ok(addresses, "주소 목록을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "회원 주소지 추가")
    @PostMapping("/")
    public ResponseDto<?> addAddress(@AuthenticationPrincipal CustomUserDetails customUserDetails,@Valid @RequestBody AddressRequest addressRequest) {
        addressService.addMemberAddress(addressRequest, customUserDetails.getUserId());
        return ResponseDto.ok(null, "주소를 성공적으로 추가했습니다.");
    }

    @Operation(summary = "회원 주소지 수정")
    @PutMapping("/{addressId}")
    public ResponseDto<?> updateAddress(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long addressId, @Valid @RequestBody AddressRequest addressRequest) {
        addressService.updateMemberAddress(addressId, addressRequest, customUserDetails.getUserId());
        return ResponseDto.ok(null, "주소를 성공적으로 수정했습니다.");
    }

    @Operation(summary = "회원 주소지 삭제")
    @DeleteMapping("/{addressId}")
    public ResponseDto<?> deleteAddress(@AuthenticationPrincipal CustomUserDetails customUserDetails, @PathVariable Long addressId) {
        addressService.deleteMemberAddress(addressId, customUserDetails.getUserId());
        return ResponseDto.ok(null, "주소를 성공적으로 삭제했습니다.");
    }

}
