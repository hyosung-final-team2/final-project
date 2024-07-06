package kr.or.kosa.ubun2_be.global.auth.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.or.kosa.ubun2_be.global.auth.dto.RefreshRequest;
import kr.or.kosa.ubun2_be.global.auth.service.RefreshTokenService;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpHeaders;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequiredArgsConstructor
public class AuthController {
    private final RefreshTokenService refreshTokenService;

    @PostMapping("/token/refresh")
    public ResponseDto<?> reissue(@RequestBody RefreshRequest refreshRequest, HttpServletResponse response, HttpServletRequest request) {

        String[] tokens = refreshTokenService.refreshTokens(refreshRequest.getRefreshToken());

        refreshTokenService.deleteCookie(response, "refreshToken");
        response.setHeader(HttpHeaders.AUTHORIZATION, "Bearer " + tokens[0]);
        Cookie refreshTokenCookie = refreshTokenService.createRefreshTokenCookie("refreshToken",tokens[1]);
        response.addCookie(refreshTokenCookie);

        return new ResponseDto<>().ok(null, "토큰 정상 발급 완료");
    }
}