package kr.or.kosa.ubun2_be.global.auth.filter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthException;
import kr.or.kosa.ubun2_be.global.auth.exception.AuthExceptionType;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.auth.utils.JwtUtil;
import kr.or.kosa.ubun2_be.global.auth.utils.UserFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;


@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserFactory userFactory;
    private final RedisTemplate<String, Object> redisTemplate;
    private static final String BLACKLIST_PREFIX = "blacklist:";

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");

        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorization.split(" ")[1];

        // 블랙리스트 검증
        if (Boolean.TRUE.equals(redisTemplate.hasKey(BLACKLIST_PREFIX + token))) {
            System.out.println("blacklist : " + redisTemplate.hasKey(BLACKLIST_PREFIX + token));
            throw new AuthException(AuthExceptionType.BLACKLIST_TOKEN);
        }

        //토큰 만료 시간 검증
        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 토큰이 access인지 확인
        String tokenType = jwtUtil.getTokenType(token);
        if (!tokenType.equals("access")) {
            throw new AuthException(AuthExceptionType.INVALID_JWT_ACCESS);
        }

        Long userId = jwtUtil.getUserId(token);
        String loginId = jwtUtil.getLoginId(token);
        String role = jwtUtil.getRole(token); // "ROLE_CUSTOMER" or "ROLE_MEMBER"

        CustomUserDetails customUserDetails = userFactory.createUserDetails(userId,loginId, role);
        setAuthentication(customUserDetails);

        filterChain.doFilter(request, response);
    }

    private void setAuthentication(CustomUserDetails customUserDetails) {
        Authentication authToken = UsernamePasswordAuthenticationToken.authenticated(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
}
