package kr.or.kosa.ubun2_be.domain.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.member.dto.*;
import kr.or.kosa.ubun2_be.domain.member.service.MemberService;
import org.junit.jupiter.api.BeforeEach;
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

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MemberControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private MemberService memberService;

    private PaymentPasswordRequest request ;


    @BeforeEach
    void setUp() {
        request = new PaymentPasswordRequest();
        request.setPaymentPassword("111111");
    }

    @Test
    @DisplayName("회원 회원가입 성공")
    void createMember() throws Exception {
        MemberSignUpRequest request = new MemberSignUpRequest("john123","john123@","이주원","test1@example.com","010-1111-1111","fcmtokenslkf");

        doNothing().when(memberService).createMember(any(MemberSignUpRequest.class));

        mockMvc.perform(post("/api/members/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(memberService).createMember(any(MemberSignUpRequest.class));
    }

    @Test
    void getStores() throws Exception {
        List<CustomerResponse> mockResponse = Arrays.asList(new CustomerResponse(), new CustomerResponse());
        when(memberService.getCustomers(anyLong())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/members/stores")
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(memberService).getCustomers(eq(member.getUserId()));
    }

    @Test
    void getAnnouncement() throws Exception {
        Long customerId = 1L;
        AnnouncementResponse mockResponse = new AnnouncementResponse();
        when(memberService.getAnnouncement(anyLong(), anyLong())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/members/announcement/{customer_id}", customerId)
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").exists())
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(memberService).getAnnouncement(eq(customerId), eq(member.getUserId()));
    }

    @Test
    void updateFcmToken() throws Exception {
        FcmTokenRequest request = new FcmTokenRequest();
        request.setFcmToken("feckjsldkf");

        doNothing().when(memberService).updateMemberFcmToken(anyLong(), any(FcmTokenRequest.class));

        mockMvc.perform(put("/api/members/fcmtoken")
                        .with(user(member))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("fcm 토큰 등록/업데이트 완료"));

        verify(memberService).updateMemberFcmToken(eq(member.getUserId()), any(FcmTokenRequest.class));
    }

    @Test
    void simpleCheck() throws Exception {
        when(memberService.simpleCheck(anyLong(), any(PaymentPasswordRequest.class))).thenReturn(true);

        mockMvc.perform(post("/api/members/simplecheck")
                        .with(user(member))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").value(true))
                .andExpect(jsonPath("$.message").value("결제 비밀번호 체크 완료"));

        verify(memberService).simpleCheck(eq(member.getUserId()), any(PaymentPasswordRequest.class));
    }

    @Test
    void simplePassword() throws Exception {
        doNothing().when(memberService).registerSimplePassword(anyLong(), any(PaymentPasswordRequest.class));

        mockMvc.perform(post("/api/members/simplepassword")
                        .with(user(member))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("결제 비밀번호 등록 완료"));

        verify(memberService).registerSimplePassword(eq(member.getUserId()), any(PaymentPasswordRequest.class));
    }

    @Test
    void updateSimplePassword() throws Exception {
        doNothing().when(memberService).updateSimplePassword(anyLong(), any(PaymentPasswordRequest.class));

        mockMvc.perform(put("/api/members/simplepassword")
                        .with(user(member))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("결제 비밀번호 수정 완료"));

        verify(memberService).updateSimplePassword(eq(member.getUserId()), any(PaymentPasswordRequest.class));

    }

    @Test
    void memberInfo() throws Exception {
        MemberInfoResponse mockResponse = new MemberInfoResponse();
        when(memberService.memberInfo(anyLong())).thenReturn(mockResponse);

        mockMvc.perform(get("/api/members/memberinfo")
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").exists())
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(memberService).memberInfo(eq(member.getUserId()));
    }
}