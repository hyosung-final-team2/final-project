package kr.or.kosa.ubun2_be.global.auth.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthException;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthExceptionType;
import kr.or.kosa.ubun2_be.global.auth.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final RedisTemplate<String, Object> redisTemplate;
    private final JwtUtil jwtUtil;

    @Value(value = "${spring.jwt.refresh-expiration-time}")
    private Long refreshExpirationTime;
    @Value(value = "${spring.jwt.refresh-cookie-expiration-time}")
    private int cookieExpirationTime;

    public void saveRedisRefreshToken(String username, String refreshToken) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        valueOperations.set(username, refreshToken, Duration.ofSeconds(refreshExpirationTime));
    }

    public Optional<String> getRedisRefreshToken(String loginId) {
        ValueOperations<String, Object> valueOperations = redisTemplate.opsForValue();
        String refreshToken = (String) valueOperations.get(loginId);
        return Optional.ofNullable(refreshToken);
    }

    public void deleteRedisRefreshToken(String loginId) {
        redisTemplate.delete(loginId);
    }

    //TODO: cookie.setSecure(true); https 설정 / cookie.setPath("/"); 쿠키 적용 범위
    public Cookie createRefreshTokenCookie(String key, String value) {
        Cookie cookie = new Cookie(key, value);
        cookie.setPath("/");
        cookie.setMaxAge(cookieExpirationTime);
        cookie.setHttpOnly(true);
        return cookie;
    }

    public void deleteCookie(HttpServletResponse response, String cookieName) {
        Cookie cookie = new Cookie(cookieName, null);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }

    public String[] refreshTokens(String refreshToken) {
        // 1. refreshToken이 만료되지 않았고 2. 토큰 타입이 refresh이고 3. redis에도 존재하면
        if (jwtUtil.isExpired(refreshToken) ||
            !jwtUtil.getTokenType(refreshToken).equals("refresh") ||
            getRedisRefreshToken(jwtUtil.getLoginId(refreshToken)).isEmpty() ||
            !getRedisRefreshToken(jwtUtil.getLoginId(refreshToken)).get().equals(refreshToken)
        ) {
            throw new AuthException(AuthExceptionType.INVALID_JWT_REFRESH);
        }

        String loginId = jwtUtil.getLoginId(refreshToken);
        String newRefreshToken = jwtUtil.createJwt("refresh", loginId, jwtUtil.getRole(refreshToken));
        this.saveRedisRefreshToken(loginId, newRefreshToken);
        String newAccessToken = jwtUtil.createJwt("access", loginId, jwtUtil.getRole(refreshToken));

        return new String[] { newAccessToken, newRefreshToken };
    }
}
