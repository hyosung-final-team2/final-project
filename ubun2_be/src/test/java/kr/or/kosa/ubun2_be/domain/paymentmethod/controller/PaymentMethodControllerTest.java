package kr.or.kosa.ubun2_be.domain.paymentmethod.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.AccountPayment.AccountPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.CardPayment.CardPaymentResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.MemberPaymentMethodsResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDeleteRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodDetailResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.PaymentMethodRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.service.PaymentMethodService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.auth.model.UserType;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class PaymentMethodControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private PaymentMethodService paymentMethodService;

    @MockBean
    private CustomUserDetails customUserDetails;

    @BeforeEach
    void setUp() {
        customUserDetails = new CustomUserDetails(
                new UserType() {
                    @Override
                    public Long getId() {
                        return 1L;
                    }

                    @Override
                    public String getLoginId() {
                        return "testuser";
                    }

                    @Override
                    public String getPassword() {
                        return "password";
                    }

                    @Override
                    public String getRole() {
                        return "ROLE_CUSTOMER";
                    }
                }
        );
    }


    @Test
    @DisplayName("카드결제수단을 전체 조회한다")
    void getCardPaymentMethods() throws Exception {
        // Given
        CardPaymentResponse cardPaymentResponse1 = new CardPaymentResponse();
        cardPaymentResponse1.setPaymentMethodId(1L);
        cardPaymentResponse1.setMemberEmail("user1@example.com");
        cardPaymentResponse1.setMemberName("김철수");
        cardPaymentResponse1.setPaymentType("CARD");
        cardPaymentResponse1.setCardCompanyName("신한카드");
        cardPaymentResponse1.setCardNumber("1234-5678-9012-3456");

        CardPaymentResponse cardPaymentResponse2 = new CardPaymentResponse();
        cardPaymentResponse2.setPaymentMethodId(2L);
        cardPaymentResponse2.setMemberEmail("user2@example.com");
        cardPaymentResponse2.setMemberName("이영희");
        cardPaymentResponse2.setPaymentType("CARD");
        cardPaymentResponse2.setCardCompanyName("삼성카드");
        cardPaymentResponse2.setCardNumber("9876-5432-1098-7654");

        List<CardPaymentResponse> cardPayments = Arrays.asList(cardPaymentResponse1,cardPaymentResponse2);
        Page<CardPaymentResponse> cardPaymentPage = new PageImpl<>(cardPayments, PageRequest.of(0, 10), cardPayments.size());

        when(paymentMethodService.getAllCardPaymentMethodsForMember(any(), any(),anyLong())).thenReturn(cardPaymentPage);

        // When & Then
        mockMvc.perform(get("/api/customers/payments/cards")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "paymentMethodId,asc")
                        .with(user(customUserDetails)))
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

    }

    @Test
    @DisplayName("계좌결제수단을 전체 조회한다")
    void getAccountPaymentMethods() throws Exception {
        // Given
        AccountPaymentResponse accountPaymentResponse1 = new AccountPaymentResponse();
        accountPaymentResponse1.setPaymentMethodId(1L);
        accountPaymentResponse1.setMemberEmail("user1@example.com");
        accountPaymentResponse1.setMemberName("김철수");
        accountPaymentResponse1.setPaymentType("ACCOUNT");
        accountPaymentResponse1.setBankName("신한은행");
        accountPaymentResponse1.setAccountNumber("123-456-789012");

        AccountPaymentResponse accountPaymentResponse2 = new AccountPaymentResponse();
        accountPaymentResponse2.setPaymentMethodId(2L);
        accountPaymentResponse2.setMemberEmail("user2@example.com");
        accountPaymentResponse2.setMemberName("이영희");
        accountPaymentResponse2.setPaymentType("ACCOUNT");
        accountPaymentResponse2.setBankName("국민은행");
        accountPaymentResponse2.setAccountNumber("987-654-32109");

        List<AccountPaymentResponse> accountPayments = Arrays.asList(accountPaymentResponse1,accountPaymentResponse2);
        Page<AccountPaymentResponse> accountPaymentPage = new PageImpl<>(accountPayments, PageRequest.of(0, 10), accountPayments.size());

        when(paymentMethodService.getAllAccountPaymentMethodsForMember(any(), any(),anyLong())).thenReturn(accountPaymentPage);

        // When & Then
        mockMvc.perform(get("/api/customers/payments/accounts")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "paymentMethodId,asc")
                        .with(user(customUserDetails)))
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

    }

    @Test
    @DisplayName("결제수단 아이디로 회원 상세 정보를 조회한다")
    void getPaymentMethodDetailByMemberId() throws Exception {
        // Given
        Long paymentMethodId = 1L;

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

        when(paymentMethodService.getPaymentMethodDetailByMemberId(eq(paymentMethodId), eq(customUserDetails.getUserId())))
                .thenReturn(response);

        // When & Then
        mockMvc.perform(get("/api/customers/payments/{payment_method_id}", paymentMethodId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(user(customUserDetails)))
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
                .andExpect(jsonPath("$.message").value("결제수단 상세를 성공적으로 조회했습니다."));

        // Verify
        verify(paymentMethodService).getPaymentMethodDetailByMemberId(eq(paymentMethodId), eq(customUserDetails.getUserId()));
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

        doNothing().when(paymentMethodService).addPaymentMethod(any(PaymentMethodRequest.class),anyLong());

        // When & Then
        mockMvc.perform(post("/api/customers/payments/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request))
                        .with(user(customUserDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("결제 수단이 성공적으로 등록되었습니다."));

        verify(paymentMethodService).addPaymentMethod(any(PaymentMethodRequest.class),eq(customUserDetails.getUserId()));
    }


    @Test
    @DisplayName("결제 수단을 삭제한다")
    void deletePayment() throws Exception {
        // Given
        Long paymentMethodId = 1L;

        doNothing().when(paymentMethodService).deletePaymentMethod(anyLong(),anyLong());

        // When & Then
        mockMvc.perform(delete("/api/customers/payments/{payment_method_id}", paymentMethodId)
                        .with(user(customUserDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("주소가 성공적으로 삭제되었습니다."));

        verify(paymentMethodService).deletePaymentMethod(eq(paymentMethodId), eq(customUserDetails.getUserId()));
    }

    @Test
    @DisplayName("회원 아이디로 회원의 결제수단 목록을 조회한다")
    void getMyPaymentMethods() throws Exception {
        // Given
        Long memberId = 1L;
        List<MemberPaymentMethodsResponse> mockResponses = Arrays.asList(
                MemberPaymentMethodsResponse.builder()
                        .paymentMethodId(1L)
                        .paymentType("CARD")
                        .cardCompanyName("신한카드")
                        .cardNumber("1234-5678-9012-3456")
                        .build(),
                MemberPaymentMethodsResponse.builder()
                        .paymentMethodId(2L)
                        .paymentType("ACCOUNT")
                        .bankName("국민은행")
                        .accountNumber("987-654-32109")
                        .build()
        );

        when(paymentMethodService.getMemberPaymentMethods(eq(memberId), eq(customUserDetails.getUserId())))
                .thenReturn(mockResponses);

        // When & Then
        mockMvc.perform(get("/api/customers/payments/member/{member_id}", memberId)
                        .with(user(customUserDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.data[0].paymentMethodId").value(1))
                .andExpect(jsonPath("$.data[0].paymentType").value("CARD"))
                .andExpect(jsonPath("$.data[0].cardCompanyName").value("신한카드"))
                .andExpect(jsonPath("$.data[0].cardNumber").value("1234-5678-9012-3456"))
                .andExpect(jsonPath("$.data[1].paymentMethodId").value(2))
                .andExpect(jsonPath("$.data[1].paymentType").value("ACCOUNT"))
                .andExpect(jsonPath("$.data[1].bankName").value("국민은행"))
                .andExpect(jsonPath("$.data[1].accountNumber").value("987-654-32109"))
                .andExpect(jsonPath("$.message").value("회원의 결제수단 목록을 성공적으로 조회했습니다."));

        verify(paymentMethodService).getMemberPaymentMethods(eq(memberId), eq(customUserDetails.getUserId()));
    }

    @Test
    @DisplayName("선택된 결제 수단들을 삭제한다")
    void deleteSelectedPayment() throws Exception {
        // Given
        List<PaymentMethodDeleteRequest> deleteRequests = Arrays.asList(
                new PaymentMethodDeleteRequest(1L),
                new PaymentMethodDeleteRequest(2L)
        );

        doNothing().when(paymentMethodService).deleteSelectedPaymentMethod(anyList(), eq(customUserDetails.getUserId()));

        // When & Then
        mockMvc.perform(delete("/api/customers/payments/selected")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(deleteRequests))
                        .with(user(customUserDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("주소가 성공적으로 삭제되었습니다."));

        verify(paymentMethodService).deleteSelectedPaymentMethod(anyList(), eq(customUserDetails.getUserId()));
    }

}