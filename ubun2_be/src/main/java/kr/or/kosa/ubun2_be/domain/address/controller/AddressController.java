package kr.or.kosa.ubun2_be.domain.address.controller;

import io.swagger.v3.oas.annotations.Operation;

import kr.or.kosa.ubun2_be.domain.address.dto.AddressMemberDetailRequest;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressMemberInfoResponse;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressRequest;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressResponse;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
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
@RequestMapping("/customers/addresses")
public class AddressController {
    private final AddressService addressService;
    private static final int PAGE_SIZE = 9;
    private static final String SORT_DEFAULT = "createdAt";

    @Operation(summary = "전체 주소 목록 조회")
    @GetMapping("/")

    public ResponseDto<?> getAllAddresses(
            @PageableDefault(size = PAGE_SIZE, sort = "addressId", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<AddressResponse> addresses = addressService.getAllAddresses(pageable);
        return ResponseDto.ok(addresses, "주소 목록을 성공적으로 조회했습니다.");
    }

    @Operation(summary = "주소아이디로 회원 정보 조회")
    @GetMapping("/{address_id}")
    public ResponseDto<?> getMemberAddressInfo(@PathVariable("address_id") Long addressId) {
        AddressMemberDetailRequest addressMemberDetailRequest = AddressMemberDetailRequest.builder()
                .addressId(addressId).build();
        AddressMemberInfoResponse response = addressService.getMemberInfoByAddressId(addressMemberDetailRequest);
        return ResponseDto.ok(response, "주소 상세를 성공적으로 조회했습니다.");
    }

    @Operation(summary = "주소 등록")
    @PostMapping(value = "/", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<?> addAddress(@RequestBody AddressRequest addressRequest) {
        addressService.addAddress(addressRequest);
        return ResponseDto.ok(null, "주소가 성공적으로 등록되었습니다.");
    }

    @Operation(summary = "회원의 주소 수정")
    @PutMapping(value = "/{address_id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<?> updateAddress(@PathVariable("address_id") Long addressId, @RequestBody AddressRequest addressRequest) {
        addressService.updateAddress(addressId, addressRequest);
        return ResponseDto.ok(null, "주소가 성공적으로 수정되었습니다.");
    }

    @Operation(summary = "주소 삭제")
    @DeleteMapping("/{address_id}")
    public ResponseDto<?> deleteAddress(@PathVariable("address_id") Long addressId) {
        addressService.deleteAddress(addressId);
        return ResponseDto.ok(null, "주소가 성공적으로 삭제되었습니다.");
    }


}
