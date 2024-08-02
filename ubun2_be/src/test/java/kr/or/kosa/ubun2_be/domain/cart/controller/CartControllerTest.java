package kr.or.kosa.ubun2_be.domain.cart.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.cart.dto.*;
import kr.or.kosa.ubun2_be.domain.cart.service.CartService;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class CartControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CartService cartService;

    @Test
    @DisplayName("장바구니 생성")
    void registerCarts() throws Exception {
        CartProductRequest productRequest1 = new CartProductRequest();
        productRequest1.setProductId(1L);
        productRequest1.setQuantity(2);
        productRequest1.setOrderOption(OrderOption.SINGLE);

        CartProductRequest productRequest2 = new CartProductRequest();
        productRequest2.setProductId(2L);
        productRequest2.setQuantity(1);
        productRequest2.setOrderOption(OrderOption.SUBSCRIPTION);

        CartRequest cartRequest = new CartRequest();
        cartRequest.setCustomerId(1L);
        cartRequest.setMemberId(1L);
        cartRequest.setCartProducts(Arrays.asList(productRequest1, productRequest2));

        List<CartRequest> cartRequests = Arrays.asList(cartRequest);

        mockMvc.perform(post("/api/members/carts")
                        .with(user(member))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(cartRequests)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(cartService).createCarts(eq(member.getUserId()), anyList());
    }

    @Test
    @DisplayName("전체 상점 통합 장바구니 조회")
    void getCarts() throws Exception {
        List<CartResponse> cartResponses = Arrays.asList(new CartResponse(), new CartResponse());
        when(cartService.getCarts(anyLong())).thenReturn(cartResponses);

        mockMvc.perform(get("/api/members/carts")
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(cartService).getCarts(eq(member.getUserId()));
    }

    @Test
    @DisplayName("장바구니 수량 업데이트")
    void updateCartProductQuantities() throws Exception {
        CartProductDetailRequest productDetail1 = new CartProductDetailRequest();
        productDetail1.setCartProductId(1L);
        productDetail1.setQuantity(3);

        CartProductDetailRequest productDetail2 = new CartProductDetailRequest();
        productDetail2.setCartProductId(2L);
        productDetail2.setQuantity(2);

        CartProductUpdateRequest updateRequest = new CartProductUpdateRequest();
        updateRequest.setCartId(1L);
        updateRequest.setCustomerId(1L);
        updateRequest.setCartProducts(Arrays.asList(productDetail1, productDetail2));

        List<CartProductUpdateRequest> updateRequests = Arrays.asList(updateRequest);

        mockMvc.perform(put("/api/members/carts")
                        .with(user(member))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(updateRequests)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(cartService).updateCartProductQuantities(eq(member.getUserId()), anyList());
    }

    @Test
    @DisplayName("장바구니 제품 삭제")
    void deleteCartProducts() throws Exception {
        CartProductDetailRequest productDetail1 = new CartProductDetailRequest();
        productDetail1.setCartProductId(1L);
        productDetail1.setQuantity(3);

        CartProductDetailRequest productDetail2 = new CartProductDetailRequest();
        productDetail2.setCartProductId(2L);
        productDetail2.setQuantity(2);

        CartProductDeleteRequest deleteRequest = new CartProductDeleteRequest();
        deleteRequest.setCartId(1L);
        deleteRequest.setCustomerId(1L);
        deleteRequest.setCartProducts(Arrays.asList(productDetail1, productDetail2));

        List<CartProductDeleteRequest> deleteRequests = Arrays.asList(deleteRequest);

        mockMvc.perform(delete("/api/members/carts")
                        .with(user(member))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(deleteRequests)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(cartService).deleteCartProducts(eq(member.getUserId()), anyList());
    }
}