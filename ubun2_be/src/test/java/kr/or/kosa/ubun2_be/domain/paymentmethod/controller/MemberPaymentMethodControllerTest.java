package kr.or.kosa.ubun2_be.domain.paymentmethod.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.MyAccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.MyCardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.RegisterPaymentMethodRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.UpdatePaymentMethodRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.service.PaymentMethodService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MemberPaymentMethodControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PaymentMethodService paymentMethodService;

    @Test
    @DisplayName(value = "전체 카드 목록 조회")
    void checkPaymentPassword() throws Exception {
        when(paymentMethodService.hasPaymentPassword(anyLong())).thenReturn(true);

        mockMvc.perform(get("/api/members/payments/password")
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").value(true))
                .andExpect(jsonPath("$.message").value("결제비밀번호 존재 여부를 성공적으로 확인했습니다."));

        verify(paymentMethodService).hasPaymentPassword(eq(member.getUserId()));
    }

    @Test
    @DisplayName(value = "전체 카드 목록 조회")
    void getAllCardPaymentMethods() throws Exception {
        List<MyCardPaymentResponse> mockResponses = Arrays.asList(
                new MyCardPaymentResponse(),
                new MyCardPaymentResponse()
        );

        when(paymentMethodService.getMyCardPaymentMethods(anyLong())).thenReturn(mockResponses);

        mockMvc.perform(get("/api/members/payments/cards")
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.message").value("카드 목록을 성공적으로 조회했습니다."));

        verify(paymentMethodService).getMyCardPaymentMethods(eq(member.getUserId()));

    }

    @Test
    @DisplayName(value = "전체 계좌 목록 조회")
    void getAllAccountPaymentMethods() throws Exception {
        List<MyAccountPaymentResponse> mockResponses = Arrays.asList(
                new MyAccountPaymentResponse(),
                new MyAccountPaymentResponse()
        );

        when(paymentMethodService.getMyAccountPaymentMethods(anyLong())).thenReturn(mockResponses);

        mockMvc.perform(get("/api/members/payments/accounts")
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.message").value("계좌 목록을 성공적으로 조회했습니다."));

        verify(paymentMethodService).getMyAccountPaymentMethods(eq(member.getUserId()));
    }

    @Test
    @DisplayName(value = "카드 상세 조회")
    void getCardPaymentMethod() throws Exception {
        Long paymentMethodId = 1L;
        MyCardPaymentResponse mockResponse = new MyCardPaymentResponse();

        when(paymentMethodService.getMyCardPaymentMethod(anyLong(), anyLong())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/members/payments/cards/{paymentMethodId}", paymentMethodId)
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").exists())
                .andExpect(jsonPath("$.message").value("카드를 성공적으로 조회했습니다."));

        verify(paymentMethodService).getMyCardPaymentMethod(eq(paymentMethodId), eq(member.getUserId()));
    }

    @Test
    @DisplayName(value = "계좌 상세 조회")
    void getAccountPaymentMethod() throws Exception {
        Long paymentMethodId = 1L;
        MyAccountPaymentResponse mockResponse = new MyAccountPaymentResponse();

        when(paymentMethodService.getMyAccountPaymentMethod(anyLong(), anyLong())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/members/payments/accounts/{paymentMethodId}", paymentMethodId)
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").exists())
                .andExpect(jsonPath("$.message").value("계좌를 성공적으로 조회했습니다."));

        verify(paymentMethodService).getMyAccountPaymentMethod(eq(paymentMethodId), eq(member.getUserId()));
    }

    @Test
    @DisplayName(value="결제수단 등록")
    void registerPaymentMethod() throws Exception {
        RegisterPaymentMethodRequest request = new RegisterPaymentMethodRequest();
        request.setPaymentType("CARD");  // 필수 필드
        request.setCardCompanyName("신한카드");
        request.setCardNumber("1234-5678-9012-3456");
        request.setPaymentMethodNickname("내 신한카드");

        doNothing().when(paymentMethodService).registerPaymentMethod(any(RegisterPaymentMethodRequest.class), anyLong());

        mockMvc.perform(post("/api/members/payments")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("결제수단을 성공적으로 등록했습니다."));

        verify(paymentMethodService).registerPaymentMethod(any(RegisterPaymentMethodRequest.class), eq(member.getUserId()));
    }

    @Test
    void updatePaymentMethod() throws Exception {
        Long paymentMethodId = 1L;
        UpdatePaymentMethodRequest request = new UpdatePaymentMethodRequest();
        request.setPaymentMethodNickname("내 계좌");
        doNothing().when(paymentMethodService).updatePaymentMethod(anyLong(), any(UpdatePaymentMethodRequest.class), anyLong());

        mockMvc.perform(put("/api/members/payments/{paymentMethodId}", paymentMethodId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("결제수단을 성공적으로 수정했습니다."));

        verify(paymentMethodService).updatePaymentMethod(eq(paymentMethodId), any(UpdatePaymentMethodRequest.class), eq(member.getUserId()));
    }

    @Test
    void deletePaymentMethod() throws Exception {
        Long paymentMethodId = 1L;
        doNothing().when(paymentMethodService).deleteMyPaymentMethod(anyLong(), anyLong());

        mockMvc.perform(delete("/api/members/payments/{paymentMethodId}", paymentMethodId)
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("결제수단을 성공적으로 삭제했습니다."));

        verify(paymentMethodService).deleteMyPaymentMethod(eq(paymentMethodId), eq(member.getUserId()));
    }
}