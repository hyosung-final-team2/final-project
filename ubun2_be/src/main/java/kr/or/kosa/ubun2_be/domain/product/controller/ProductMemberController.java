package kr.or.kosa.ubun2_be.domain.product.controller;

import io.swagger.v3.oas.annotations.Operation;
import kr.or.kosa.ubun2_be.domain.product.dto.CategoryResponse;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductDetailResponse;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductResponse;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.product.service.CategoryService;
import kr.or.kosa.ubun2_be.domain.product.service.ProductService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/members")
public class ProductMemberController {

    private final CategoryService categoryService;
    private final ProductService productService;
    private static final int PAGE_SIZE = 9;
    private static final String SORT_DEFAULT = "productId";

    @Operation(summary = "상품 카테고리 조회")
    @GetMapping("/store/{customer_id}/category")
    public ResponseDto<?> getCategories(@PathVariable("customer_id") Long customerId, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        List<CategoryResponse> categories = categoryService.getCategories(customerId,customUserDetails.getUserId());
        return ResponseDto.ok(categories, "정상출력 데이터");
    }

    @Operation(summary = "전체 상품 목록 및 정렬,검색을 통한 상품 목록 조회")
    @GetMapping("/products/{customer_id}")
    public ResponseDto<?> getProducts(@PathVariable("customer_id") Long customerId, SearchRequest searchRequest, @PageableDefault(size = PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Page<ProductResponse> productResponseList = productService.getProducts(customerId, searchRequest, pageable, customUserDetails.getUserId());
        return ResponseDto.ok(productResponseList, "정상출력 데이터");
    }

    @Operation(summary = "상품 상세 조회")
    @GetMapping("/products/{customer_id}/{product_id}")
    public ResponseDto<?> getProductByProductId(@PathVariable("customer_id") Long customerId,@PathVariable("product_id") Long productId, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        ProductDetailResponse productDetailResponse = productService.getProductByCustomerIdAndProductId(customerId,productId,customUserDetails.getUserId());
        return ResponseDto.ok(productDetailResponse, "정상출력 데이터");
    }
}
