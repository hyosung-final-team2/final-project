package kr.or.kosa.ubun2_be.global.auth.controller;


import jakarta.servlet.http.Cookie;
import kr.or.kosa.ubun2_be.global.auth.service.RefreshTokenService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private RefreshTokenService refreshTokenService;

    private Cookie refreshTokenCookie;

    @BeforeEach
    void setUp() {
        refreshTokenCookie = new Cookie("refreshToken", "old-refresh-token");
    }

    @Test
    void reissue() throws Exception {
        // Given
        String newAccessToken = "new-access-token";
        String newRefreshToken = "new-refresh-token";
        when(refreshTokenService.refreshTokens(anyString())).thenReturn(new String[]{newAccessToken, newRefreshToken});

        Cookie newRefreshTokenCookie = new Cookie("refreshToken", newRefreshToken);
        when(refreshTokenService.createRefreshTokenCookie(eq("refreshToken"), eq(newRefreshToken))).thenReturn(newRefreshTokenCookie);

        // When
        ResultActions result = mockMvc.perform(post("/api/token/refresh")
                .cookie(refreshTokenCookie));

        // Then
        result.andExpect(status().isOk())
                .andExpect(header().string("Authorization", "Bearer " + newAccessToken))
                .andExpect(cookie().value("refreshToken", newRefreshToken))
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("토큰 정상 발급 완료"));

        verify(refreshTokenService).refreshTokens("old-refresh-token");
        verify(refreshTokenService).deleteCookie(any(), eq("refreshToken"));
        verify(refreshTokenService).createRefreshTokenCookie(eq("refreshToken"), eq(newRefreshToken));
    }
}