package kr.or.kosa.ubun2_be.domain.product.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.product.dto.*;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import kr.or.kosa.ubun2_be.domain.product.service.ProductService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class ProductCustomerControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private ProductService productService;

    @Test
    @DisplayName("전체 상품 목록 및 정렬,검색을 통한 상품 목록 조회")
    void getProducts() throws Exception {
        // given
        SearchRequest searchRequest = new SearchRequest();
        searchRequest.setSearchCategory("상품명");
        searchRequest.setSearchKeyword("복숭아");

        ProductResponse product1 = new ProductResponse();
        product1.setProductName("복숭아 음료");
        ProductResponse product2 = new ProductResponse();
        product2.setProductName("복숭아 젤리");
        Page<ProductResponse> mockPage = new PageImpl<>(Arrays.asList(product1, product2));

        when(productService.getProducts(eq(1L), argThat(request ->
                        "상품명".equals(request.getSearchCategory()) &&
                                "복숭아".equals(request.getSearchKeyword())),
                any(Pageable.class), eq(false)))
                .thenReturn(mockPage);

        // when & then
        mockMvc.perform(get("/api/customers/products")
                        .param("page", "0")
                        .param("size", "8")
                        .param("sort", "productName,desc")
                        .param("searchCategory", "상품명")
                        .param("searchKeyword", "복숭아")
                        .with(user(customer)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.content", hasSize(2)))
                .andExpect(jsonPath("$.data.content[0].productName").value("복숭아 음료"))
                .andExpect(jsonPath("$.data.content[1].productName").value("복숭아 젤리"))
                .andExpect(jsonPath("$.data.totalElements").value(2));

    }

    @Test
    @DisplayName("상품 상세 조회")
    void getProductByProductId() throws Exception {
        // given
        Long productId = 1L;
        ProductDetailResponse mockResponse = new ProductDetailResponse();
        mockResponse.setProductId(productId);
        mockResponse.setProductName("테스트 상품");
        mockResponse.setProductPrice(10000);

        when(productService.getProductByCustomerIdAndProductId(eq(1L), eq(productId), eq(false)))
                .thenReturn(mockResponse);

        // when & then
        mockMvc.perform(get("/api/customers/products/" + productId)
                        .with(user(customer)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.data.productId").value(productId))
                .andExpect(jsonPath("$.data.productName").value("테스트 상품"))
                .andExpect(jsonPath("$.data.productPrice").value(10000));

        verify(productService).getProductByCustomerIdAndProductId(eq(1L), eq(productId), eq(false));

    }

    @Test
    @DisplayName("상품 등록")
    void registerProduct() throws Exception {
        // given
        ProductRequest request = new ProductRequest();
        request.setProductName("Test Product");
        request.setCategoryName("Test Category");
        request.setProductPrice(1000);
        request.setOrderOption(OrderOption.SINGLE);
        request.setProductDescription("Test Description");
        request.setStockQuantity(100);
        request.setProductDiscount(10);
        request.setProductStatus(true);

        MockMultipartFile image = new MockMultipartFile("image", "test.jpg", MediaType.IMAGE_JPEG_VALUE, "test image content".getBytes());
        MockMultipartFile productRequestPart = new MockMultipartFile("productRequest", "", MediaType.APPLICATION_JSON_VALUE, objectMapper.writeValueAsString(request).getBytes());

        // when & then
        mockMvc.perform(multipart("/api/customers/products")
                        .file(image)
                        .file(productRequestPart)
                        .with(user(customer)))
                .andDo(print())
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(productService).registerProduct(any(MultipartFile.class), eq(customer.getUserId()), any(ProductRequest.class));

    }

    @Test
    @DisplayName("상품 수정")
    void updateProduct() throws Exception {
        // given
        ProductRequest productRequest = new ProductRequest();
        productRequest.setProductId(1L);
        productRequest.setProductName("Updated Product");
        productRequest.setCategoryName("Updated Category");
        productRequest.setProductPrice(2000);
        productRequest.setOrderOption(OrderOption.SINGLE);

        MockMultipartFile image = new MockMultipartFile("image", "updated.jpg", MediaType.IMAGE_JPEG_VALUE, "updated image content".getBytes());
        MockMultipartFile productRequestPart = new MockMultipartFile("productRequest", "", MediaType.APPLICATION_JSON_VALUE, objectMapper.writeValueAsString(productRequest).getBytes());

        // when & then
        mockMvc.perform(multipart("/api/customers/products")
                        .file(image)
                        .file(productRequestPart)
                        .with(request -> {
                            request.setMethod("PUT");
                            return request;
                        })
                        .with(user(customer)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("상품 삭제")
    void removeProduct() throws Exception {
        // when & then
        mockMvc.perform(delete("/api/customers/products/1")
                        .with(user(customer)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("전체 카테고리 조회")
    void getProductCategory() throws Exception {
        // given
        List<CategoryResponse> mockCategories = Arrays.asList(new CategoryResponse(), new CategoryResponse());
        when(productService.getProductCategory()).thenReturn(mockCategories);

        // when & then
        mockMvc.perform(get("/api/customers/products/category")
                        .with(user(customer)))
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    void removeSelectedProducts() throws Exception {
        // given
        ProductDeleteSelectedRequest request = new ProductDeleteSelectedRequest();
        request.setProductIdList(Arrays.asList(1L, 2L, 3L));

        // when & then
        mockMvc.perform(delete("/api/customers/products/selected")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .with(user(customer)))
                .andDo(print())
                .andExpect(status().isOk());
    }

}