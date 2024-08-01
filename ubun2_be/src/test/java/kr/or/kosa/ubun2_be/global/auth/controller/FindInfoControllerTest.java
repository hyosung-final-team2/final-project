package kr.or.kosa.ubun2_be.global.auth.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.global.auth.dto.*;
import kr.or.kosa.ubun2_be.global.auth.service.FindInfoService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class FindInfoControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private FindInfoService findInfoService;

    @Test
    @DisplayName("고객&회원 아이디 찾기")
    void findId() throws Exception {
        FindIdRequest request = new FindIdRequest("이찬혁", "john@example.com", "ROLE_CUSTOMER");
        FindIdResponse response = FindIdResponse.createFindId("john123");

        when(findInfoService.findId(anyString(), anyString(), anyString())).thenReturn(response);

        mockMvc.perform(post("/api/find/id")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.loginId").value("john123"))
                .andExpect(jsonPath("$.message").value("아이디 찾기 성공"));

        verify(findInfoService).findId(eq("이찬혁"), eq("john@example.com"), eq("ROLE_CUSTOMER"));
    }

    @Test
    @DisplayName("고객&회원 비밀번호 찾기")
    void findPassword() throws Exception {
        FindPasswordRequest request = new FindPasswordRequest("이찬혁", "john@example.com", "john123", "ROLE_CUSTOMER");

        doNothing().when(findInfoService).findPassword(anyString(), anyString(), anyString(), anyString());

        mockMvc.perform(post("/api/find/password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("비밀번호 재설정 허용"));

        verify(findInfoService).findPassword(eq("이찬혁"), eq("john@example.com"), eq("john123"), eq("ROLE_CUSTOMER"));
    }

    @Test
    @DisplayName("고객&회원 비밀번호 재설정")
    void resetPassword() throws Exception {
        ResetPasswordRequest request = new ResetPasswordRequest("john@example.com", "newPassword123@", "ROLE_CUSTOMER");

        doNothing().when(findInfoService).resetPassword(anyString(), anyString(), anyString());

        mockMvc.perform(put("/api/reset/password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("비밀번호 재설정 완료"));

        verify(findInfoService).resetPassword(eq("john@example.com"), eq("newPassword123@"), eq("ROLE_CUSTOMER"));
    }

    @Test
    @DisplayName("고객& 회원 id 중복 체크")
    void checkLoginId() throws Exception {
        CheckLoginIdRequest request = new CheckLoginIdRequest("ROLE_CUSTOMER","john123");

        doNothing().when(findInfoService).checkLoginId(any(CheckLoginIdRequest.class));

        mockMvc.perform(post("/api/checkId")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("고객 ID 중복체크 완료"));

        verify(findInfoService).checkLoginId(any(CheckLoginIdRequest.class));
    }
}