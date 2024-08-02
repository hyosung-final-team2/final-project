package kr.or.kosa.ubun2_be.global.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.global.auth.dto.EmailAuthenticationRequest;
import kr.or.kosa.ubun2_be.global.auth.dto.EmailRequest;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import kr.or.kosa.ubun2_be.global.auth.service.EmailService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class EmailControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private EmailService emailService;

    private EmailRequest emailRequest;

    @BeforeEach
    void setUp() {
        emailRequest = new EmailRequest();
        emailRequest.setEmail("test@example.com");
        emailRequest.setUserType(UserRole.ROLE_MEMBER.toString());
    }

    @Test
    @DisplayName("인증번호 발송")
    void sendEmail() throws Exception {
        // Given

        doNothing().when(emailService).sendEmail(any(EmailRequest.class));

        // When & Then
        mockMvc.perform(post("/api/auth/send")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(emailRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(emailService).sendEmail(any(EmailRequest.class));
    }

    @Test
    @DisplayName("인증번호 검증")
    void checkAuthenticationNumber() throws Exception {
        when(emailService.validateAuthenticationNumber(any(EmailAuthenticationRequest.class))).thenReturn(true);

        // When & Then
        mockMvc.perform(post("/api/auth")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(emailRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").value(true))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(emailService).validateAuthenticationNumber(any(EmailAuthenticationRequest.class));
    }
}