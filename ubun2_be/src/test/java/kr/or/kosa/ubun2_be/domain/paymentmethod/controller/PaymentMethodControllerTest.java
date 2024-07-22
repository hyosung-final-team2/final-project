package kr.or.kosa.ubun2_be.domain.paymentmethod.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.domain.address.controller.TestSecurityConfig;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.MemberPaymentMethodsResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.service.PaymentMethodService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;

@WebMvcTest(PaymentMethodController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import(TestSecurityConfig.class)
class PaymentMethodControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PaymentMethodService paymentMethodService;

    @Test
    @DisplayName("카드결제수단을 전체 조회한다")
    void getCardPaymentMethods() throws Exception {
        // Given
        Long memberId = 1L;

        List<CardPaymentResponse> cardPayments = Arrays.asList(
                new CardPaymentResponse(1L, "user1@example.com", "김철수", "CARD", "신한카드", "1234-5678-9012-3456"),
                new CardPaymentResponse(2L, "user2@example.com", "이영희", "CARD", "삼성카드", "9876-5432-1098-7654")
        );

        Page<CardPaymentResponse> cardPaymentPage = new PageImpl<>(cardPayments, PageRequest.of(0, 10), cardPayments.size());

        when(paymentMethodService.getAllCardPaymentMethodsForMember(any(CardPaymentRequest.class), any(Pageable.class)))
                .thenReturn(cardPaymentPage);

        // When & Then
        mockMvc.perform(get("/customers/payments/cards")
                        .param("memberId", memberId.toString())
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "paymentMethodId,desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.content.length()").value(2))
                .andExpect(jsonPath("$.data.content[0].paymentMethodId").value(1))
                .andExpect(jsonPath("$.data.content[0].memberEmail").value("user1@example.com"))
                .andExpect(jsonPath("$.data.content[0].memberName").value("김철수"))
                .andExpect(jsonPath("$.data.content[0].paymentType").value("CARD"))
                .andExpect(jsonPath("$.data.content[0].cardCompanyName").value("신한카드"))
                .andExpect(jsonPath("$.data.content[0].cardNumber").value("1234-5678-9012-3456"))
                .andExpect(jsonPath("$.data.totalElements").value(2))
                .andExpect(jsonPath("$.data.totalPages").value(1))
                .andExpect(jsonPath("$.message").value("카드 목록을 성공적으로 조회했습니다."));

        // Verify
        verify(paymentMethodService).getAllCardPaymentMethodsForMember(
                argThat(request -> request.getMemberId().equals(memberId)),
                argThat(pageable ->
                        pageable.getPageNumber() == 0 &&
                                pageable.getPageSize() == 10 &&
                                pageable.getSort().equals(Sort.by(Sort.Direction.DESC, "paymentMethodId"))
                )
        );
    }

    @Test
    @DisplayName("계좌결제수단을 전체 조회한다")
    void getAccountPaymentMethods() throws Exception {
        // Given
        Long memberId = 1L;

        List<AccountPaymentResponse> accountPayments = Arrays.asList(
                new AccountPaymentResponse(1L, "user1@example.com", "김철수", "ACCOUNT", "신한은행", "123-456-789012"),
                new AccountPaymentResponse(2L, "user2@example.com", "이영희", "ACCOUNT", "국민은행", "987-654-321098")
        );

        Page<AccountPaymentResponse> accountPaymentPage = new PageImpl<>(accountPayments, PageRequest.of(0, 10), accountPayments.size());

        when(paymentMethodService.getAllAccountPaymentMethodsForMember(any(AccountPaymentRequest.class), any(Pageable.class)))
                .thenReturn(accountPaymentPage);

        // When & Then
        mockMvc.perform(get("/customers/payments/accounts")
                        .param("memberId", memberId.toString())
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "paymentMethodId,desc"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.content.length()").value(2))
                .andExpect(jsonPath("$.data.content[0].paymentMethodId").value(1))
                .andExpect(jsonPath("$.data.content[0].memberEmail").value("user1@example.com"))
                .andExpect(jsonPath("$.data.content[0].memberName").value("김철수"))
                .andExpect(jsonPath("$.data.content[0].paymentType").value("ACCOUNT"))
                .andExpect(jsonPath("$.data.content[0].bankName").value("신한은행"))
                .andExpect(jsonPath("$.data.content[0].accountNumber").value("123-456-789012"))
                .andExpect(jsonPath("$.data.totalElements").value(2))
                .andExpect(jsonPath("$.data.totalPages").value(1))
                .andExpect(jsonPath("$.message").value("계좌 목록을 성공적으로 조회했습니다."));

        // Verify
        verify(paymentMethodService).getAllAccountPaymentMethodsForMember(
                argThat(request -> request.getMemberId().equals(memberId)),
                argThat(pageable ->
                        pageable.getPageNumber() == 0 &&
                                pageable.getPageSize() == 10 &&
                                pageable.getSort().equals(Sort.by(Sort.Direction.DESC, "paymentMethodId"))
                )
        );
    }

    @Test
    @DisplayName("결제수단 아이디로 회원 상세 정보를 조회한다")
    void getPaymentMethodDetailByMemberId() throws Exception {
        // Given
        Long paymentMethodId = 1L;
        PaymentMethodDetailRequest request = PaymentMethodDetailRequest.builder()
                .paymentMethodId(paymentMethodId)
                .build();

        PaymentMethodDetailResponse response = PaymentMethodDetailResponse.builder()
                .memberName("김철수")
                .memberEmail("user1@example.com")
                .memberPhone("010-1234-5678")
                .registrationDate(LocalDateTime.now())
                .paymentMethods(Arrays.asList(
                        MemberPaymentMethodsResponse.builder()
                                .paymentMethodId(1L)
                                .cardCompanyName("신한카드")
                                .cardNumber("1234-5678-9012-3456")
                                .paymentType("CARD")
                                .build(),
                        MemberPaymentMethodsResponse.builder()
                                .paymentMethodId(2L)
                                .accountNumber("123-456-789012")
                                .bankName("국민은행")
                                .paymentType("ACCOUNT")
                                .build()
                ))
                .build();

        when(paymentMethodService.getPaymentMethodDetailByMemberId(any(PaymentMethodDetailRequest.class))).thenReturn(response);

        // When & Then
        MvcResult result = mockMvc.perform(get("/customers/payments/{payment_method_id}", paymentMethodId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.memberName").value("김철수"))
                .andExpect(jsonPath("$.data.memberEmail").value("user1@example.com"))
                .andExpect(jsonPath("$.data.memberPhone").value("010-1234-5678"))
                .andExpect(jsonPath("$.data.paymentMethods").isArray())
                .andExpect(jsonPath("$.data.paymentMethods.length()").value(2))
                .andExpect(jsonPath("$.data.paymentMethods[0].paymentMethodId").value(1))
                .andExpect(jsonPath("$.data.paymentMethods[0].accountNumber").doesNotExist())
                .andExpect(jsonPath("$.data.paymentMethods[0].bankName").doesNotExist())
                .andExpect(jsonPath("$.data.paymentMethods[0].cardCompanyName").value("신한카드"))
                .andExpect(jsonPath("$.data.paymentMethods[0].cardNumber").value("1234-5678-9012-3456"))
                .andExpect(jsonPath("$.data.paymentMethods[0].paymentType").value("CARD"))
                .andExpect(jsonPath("$.data.paymentMethods[1].paymentMethodId").value(2))
                .andExpect(jsonPath("$.data.paymentMethods[1].accountNumber").value("123-456-789012"))
                .andExpect(jsonPath("$.data.paymentMethods[1].bankName").value("국민은행"))
                .andExpect(jsonPath("$.data.paymentMethods[1].cardCompanyName").doesNotExist())
                .andExpect(jsonPath("$.data.paymentMethods[1].cardNumber").doesNotExist())
                .andExpect(jsonPath("$.data.paymentMethods[1].paymentType").value("ACCOUNT"))
                .andExpect(jsonPath("$.message").value("결제수단 상세를 성공적으로 조회했습니다."))
                .andReturn();

        // 응답 내용을 로그로 출력
        String content = result.getResponse().getContentAsString();
        System.out.println("Response content: " + content);

        verify(paymentMethodService).getPaymentMethodDetailByMemberId(argThat(req ->
                req.getPaymentMethodId().equals(paymentMethodId)
        ));
    }

    @Test
    @DisplayName("새로운 결제 수단을 등록한다")
    void addPaymentMethod() throws Exception {
        // Given
        PaymentMethodRequest request = PaymentMethodRequest.builder()
                .memberId(1L)
                .paymentType("CARD")
                .cardCompanyName("신한카드")
                .cardNumber("1234-5678-9012-3456")
                .build();

        doNothing().when(paymentMethodService).addPaymentMethod(any(PaymentMethodRequest.class));

        // When & Then
        mockMvc.perform(post("/customers/payments/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("결제 수단이 성공적으로 등록되었습니다."));

        verify(paymentMethodService).addPaymentMethod(any(PaymentMethodRequest.class));
    }

    @Test
    @DisplayName("결제 수단을 수정한다")
    void updatePayment() throws Exception {
        // Given
        Long paymentMethodId = 1L;
        PaymentMethodRequest request = PaymentMethodRequest.builder()
                .memberId(1L)
                .paymentType("CARD")
                .cardCompanyName("삼성카드")
                .cardNumber("9876-5432-1098-7654")
                .build();

        doNothing().when(paymentMethodService).updatePaymentMethod(anyLong(), any(PaymentMethodRequest.class));

        // When & Then
        mockMvc.perform(put("/customers/payments/{payment_method_id}", paymentMethodId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("결제수단이 성공적으로 수정되었습니다."));

        verify(paymentMethodService).updatePaymentMethod(eq(paymentMethodId), any(PaymentMethodRequest.class));
    }

    @Test
    @DisplayName("결제 수단을 삭제한다")
    void deletePayment() throws Exception {
        // Given
        Long paymentMethodId = 1L;

        doNothing().when(paymentMethodService).deletePaymentMethod(anyLong());

        // When & Then
        mockMvc.perform(delete("/customers/payments/{payment_method_id}", paymentMethodId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("주소가 성공적으로 삭제되었습니다."));

        verify(paymentMethodService).deletePaymentMethod(paymentMethodId);
    }

}