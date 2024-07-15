package kr.or.kosa.ubun2_be.global.auth.service;

import io.jsonwebtoken.Claims;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthException;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthExceptionType;
import kr.or.kosa.ubun2_be.global.auth.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class LogoutService implements LogoutHandler {

    private static final String BLACKLIST_PREFIX = "blacklist:";

    private final RedisTemplate<String, Object> redisTemplate;
    private final JwtUtil jwtUtil;

//    public void logout(String token) {
//        System.out.println("logout : " + token);
//        if (token == null || !token.startsWith("Bearer ")) {
//            throw new AuthException(AuthExceptionType.NO_EXIST_TOKEN);
//        }
//        token = token.substring(7);
//
//        long expiration = jwtUtil.getExpirationDate(token).getTime() - System.currentTimeMillis();
//        redisTemplate.opsForValue().set(BLACKLIST_PREFIX + token, true, expiration, TimeUnit.MILLISECONDS);
//
//    }

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String token = request.getHeader("Authorization");

        if (token == null || !token.startsWith("Bearer ")) {
            throw new AuthException(AuthExceptionType.NO_EXIST_TOKEN);
        }
        token = token.substring(7);

        long expiration = jwtUtil.getExpirationDate(token).getTime() - System.currentTimeMillis();
        redisTemplate.opsForValue().set(BLACKLIST_PREFIX + token, true, expiration, TimeUnit.MILLISECONDS);

    }
}
