package kr.or.kosa.ubun2_be.domain.address.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressResponse;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
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
    public ResponseDto<?> getAddresses(
                        @PageableDefault(size=PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable) {
        Page<AddressResponse> addressResponsesList = addressService.getAllAddresses(pageable);
        return ResponseDto.ok(addressResponsesList,"정상출력 데이터");
    }

}
