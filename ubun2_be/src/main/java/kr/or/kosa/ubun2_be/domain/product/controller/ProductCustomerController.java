package kr.or.kosa.ubun2_be.domain.product.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.product.dto.*;
import kr.or.kosa.ubun2_be.domain.product.service.ProductService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequiredArgsConstructor
@RequestMapping("/customers/products")
public class ProductCustomerController {

    private final ProductService productService;
    private static final int PAGE_SIZE = 9;
    private static final String SORT_DEFAULT = "createdAt";

    @Operation(summary = "전체 상품 목록 및 정렬,검색을 통한 상품 목록 조회")
    @GetMapping("/")
    public ResponseDto<?> findProductsByCustomerIdAndSearchKeywordOrderBy(Long customerId, SearchRequest searchRequest, @PageableDefault(size = PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable) {
        Page<ProductResponse> productResponseList = productService.findProducts(customerId, searchRequest, pageable);
        return new ResponseDto<>().ok(productResponseList, "정상출력 데이터");
    }

    @Operation(summary = "상품 상세 조회")
    @GetMapping("/{product_id}")
    public ResponseDto<?> findProductByProductId(@PathVariable("product_id") Long productId, Long customerId) {
        ProductDetailResponse productDetailResponse = productService.findByCustomerIdAndProductId(customerId, productId);
        return new ResponseDto<>().ok(productDetailResponse, "정상출력 데이터");
    }

    @Operation(summary = "상품 등록")
    @PostMapping(value = "/", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<?> insertProduct(@RequestPart(value = "image", required = false) MultipartFile image, @RequestPart ProductRequest productRequest, Long customerId) {
        productService.insertProduct(image, customerId, productRequest);
        return new ResponseDto<>().ok(null, "정상출력 데이터");
    }

    @Operation(summary = "상품 수정")
    @PutMapping(value = "/", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseDto<?> updateProduct(@RequestPart(value = "image", required = false) MultipartFile image, @RequestPart ProductRequest productRequest, Long customerId) {
        productService.updateProduct(image, customerId, productRequest);
        return new ResponseDto<>().ok(null, "정상출력 데이터");
    }

    @Operation(summary = "상품 삭제")
    @DeleteMapping("/")
    public ResponseDto<?> deleteProduct(@RequestBody ProductDeleteRequest productDeleteRequest, Long customerId) {
        productService.deleteProduct(customerId, productDeleteRequest);
        return new ResponseDto<>().ok(null, "정상출력 데이터");
    }

}
