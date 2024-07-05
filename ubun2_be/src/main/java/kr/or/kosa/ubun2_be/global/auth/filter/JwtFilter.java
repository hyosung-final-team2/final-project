package kr.or.kosa.ubun2_be.global.auth.filter;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.auth.utils.JwtUtil;
import kr.or.kosa.ubun2_be.global.auth.utils.UserFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;


@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorization = request.getHeader("Authorization");

        //Authorization 헤더 검증
        if (authorization == null || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authorization.split(" ")[1];

        //토큰 만료 시간 검증
        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            PrintWriter writer = response.getWriter();
            writer.print("access token expired");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        // 토큰이 access인지 확인
        String tokenType = jwtUtil.getTokenType(token);
        if (!tokenType.equals("access")) {
            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String loginId = jwtUtil.getLoginId(token);
        String role = jwtUtil.getRole(token); // "ROLE_CUSTOMER" or "ROLE_MEMBER"

        CustomUserDetails customUserDetails = UserFactory.createUserDetails(loginId, role);
        setAuthentication(customUserDetails);

        filterChain.doFilter(request, response);
    }

    private void setAuthentication(CustomUserDetails customUserDetails) {
        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);
    }
}
