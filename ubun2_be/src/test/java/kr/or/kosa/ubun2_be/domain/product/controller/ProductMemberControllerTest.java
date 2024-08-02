package kr.or.kosa.ubun2_be.domain.product.controller;

import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.product.dto.CategoryResponse;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductDetailResponse;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductResponse;
import kr.or.kosa.ubun2_be.domain.product.service.CategoryService;
import kr.or.kosa.ubun2_be.domain.product.service.ProductService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ProductMemberControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ProductService productService;

    @MockBean
    private CategoryService categoryService;

    @Test
    @DisplayName("상품 카테고리 조회")
    void getCategories() throws Exception {
        //given
        List<CategoryResponse> mockCategories = Arrays.asList(new CategoryResponse(), new CategoryResponse());
        when(categoryService.getCategories(anyLong(), anyLong())).thenReturn(mockCategories);

        //when & then
        mockMvc.perform(get("/api/members/store/1/category")
                        .with(user(member)))
                .andDo(print())
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("전체 상품 목록 및 정렬, 검색을 통한 조회")
    void getProducts() throws Exception {
        //given
        Page<ProductResponse> mockPage = new PageImpl<>(Arrays.asList(new ProductResponse(),new ProductResponse()));
        when(productService.getProducts(anyLong(), any(), any(), anyLong())).thenReturn(mockPage);

        //when & then
        mockMvc.perform(get("/api/members/store/1/category")
                .param("page","0")
                .param("size","9")
                .param("sort","productCategory,desc")
                .with(user(member)))
            .andDo(print())
            .andExpect(status().isOk());

    }

    @Test
    @DisplayName("상품 상세 조회")
    void getProductByProductId() throws Exception {
        //given
        ProductDetailResponse mockProductDetailResponse = new ProductDetailResponse();
        when(productService.getProductByCustomerIdAndProductId(anyLong(),anyLong(),anyLong())).thenReturn(mockProductDetailResponse);

        //when & then
        mockMvc.perform(get("/api/members/products/1/1").with(user(member)))
                .andDo(print())
                .andExpect(status().isOk());

    }

    @Test
    @DisplayName("카테고리별 상품 목록")
    void getProductsByCategory() throws Exception {
        //given
        Page<ProductResponse> mockPage = new PageImpl<>(Arrays.asList(new ProductResponse(),new ProductResponse()));
        when(productService.getProductsByCategory(anyLong(),any(),any(),anyLong())).thenReturn(mockPage);

        //when & then
        mockMvc.perform(get("/api/members/products/1/category")
                    .with(user(member)))
                .andDo(print())
                .andExpect(status().isOk());
    }
}