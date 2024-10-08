package kr.or.kosa.ubun2_be.domain.product.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import kr.or.kosa.ubun2_be.domain.product.dto.*;
import kr.or.kosa.ubun2_be.domain.product.service.ProductService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customers/products")
public class ProductCustomerController {

    private final ProductService productService;
    private static final int PAGE_SIZE = 8;
    private static final String SORT_DEFAULT = "productId";

    @Operation(summary = "전체 상품 목록 및 정렬,검색을 통한 상품 목록 조회")
    @GetMapping
    public ResponseDto<?> getProducts(SearchRequest searchRequest, @PageableDefault(size = PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Page<ProductResponse> productResponseList = productService.getProducts(customUserDetails.getUserId(), searchRequest, pageable, false);
        return ResponseDto.ok(productResponseList, "정상출력 데이터");
    }

    @Operation(summary = "상품 상세 조회")
    @GetMapping("/{product_id}")
    public ResponseDto<?> getProductByProductId(@PathVariable("product_id") Long productId, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        ProductDetailResponse productDetailResponse = productService.getProductByCustomerIdAndProductId(customUserDetails.getUserId(), productId, false);
        return ResponseDto.ok(productDetailResponse, "정상출력 데이터");
    }

    @Operation(summary = "상품 등록")
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<?> registerProduct(@RequestPart(value = "image", required = false) MultipartFile image,
                                          @RequestPart(value = "detailImages", required = false) List<MultipartFile> detailImages,
                                          @Valid @RequestPart ProductRequest productRequest, @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        productService.registerProduct(image, detailImages, customUserDetails.getUserId(), productRequest);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

    @Operation(summary = "상품 수정")
    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<?> updateProduct(@RequestPart(value = "image", required = false) MultipartFile image,
                                        @RequestPart(value = "detailImages", required = false) List<MultipartFile> detailImages,
                                        @Valid @RequestPart ProductRequest productRequest, @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        productService.modifyProduct(image, detailImages, customUserDetails.getUserId(), productRequest);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

    @Operation(summary = "상품 삭제")
    @DeleteMapping("/{product_id}")
    public ResponseDto<?> removeProduct(@PathVariable("product_id") Long productId, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        productService.removeProduct(customUserDetails.getUserId(), productId);
        return ResponseDto.ok(null, "정상출력 데이터");
    }

    @Operation(summary = "전체 카테고리 조회")
    @GetMapping("/category")
    public ResponseDto<?> getProductCategory() {
        List<CategoryResponse> categories = productService.getProductCategory();
        return ResponseDto.ok(categories, "정상출력 데이터");
    }

    @Operation(summary = "상품 리스트 삭제")
    @DeleteMapping("/selected")
    public ResponseDto<?> removeSelectedProducts(@Valid @RequestBody ProductDeleteSelectedRequest productDeleteSelectedRequest, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        productService.removeSelectedProducts(productDeleteSelectedRequest, customUserDetails.getUserId());
        return ResponseDto.ok(null, "상품 리스트 삭제 완료");
    }

}
