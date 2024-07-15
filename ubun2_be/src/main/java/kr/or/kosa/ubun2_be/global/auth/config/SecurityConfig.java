package kr.or.kosa.ubun2_be.global.auth.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import kr.or.kosa.ubun2_be.global.auth.filter.JwtFilter;
import kr.or.kosa.ubun2_be.global.auth.filter.LoginFilter;
import kr.or.kosa.ubun2_be.global.auth.service.LogoutService;
import kr.or.kosa.ubun2_be.global.auth.service.RefreshTokenService;
import kr.or.kosa.ubun2_be.global.auth.utils.JwtUtil;
import kr.or.kosa.ubun2_be.global.auth.utils.UserFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final AuthenticationManager authenticationManager;
    private final ObjectMapper objectMapper;
    private final JwtUtil jwtUtil;
    private final RefreshTokenService refreshTokenService;
    private final UserFactory userFactory;
    private final RedisTemplate<String, Object> redisTemplate;
    private final LogoutService logoutService;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .cors((cors) -> cors.configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration configuration = new CorsConfiguration();

                        configuration.setAllowedOrigins(Collections.singletonList("http://localhost:5173"));
                        configuration.setAllowedMethods(Collections.singletonList("*"));
                        configuration.setAllowCredentials(true);
                        configuration.setAllowedHeaders(Collections.singletonList("*"));
                        configuration.setMaxAge(3600L);

                        configuration.setExposedHeaders(Collections.singletonList("Authorization"));
                        configuration.addExposedHeader("Set-Cookie");

                        return configuration;
                    }
                }));

        // 로그아웃
        http
                .logout(logout -> logout
                .logoutUrl("/logout")
                .deleteCookies("refreshToken")
                .addLogoutHandler(logoutService)
                .logoutSuccessHandler((request, response, authentication) -> SecurityContextHolder.clearContext())
                );

        //csrf disable
        http
                .csrf((auth) -> auth.disable());

        //Form 로그인 방식 disable
        http
                .formLogin((auth) -> auth.disable());

        //http basic 인증 방식 disable
        http
                .httpBasic((auth) -> auth.disable());

        //경로별 인가 작업
        http
                .authorizeHttpRequests((auth) -> auth
                        .requestMatchers("/customers/login", "/customers/signup", "/token/refresh",
                                         "auth/send", "auth", "members/signup", "/find/id").permitAll()
                        .requestMatchers("/customers/**").hasRole("CUSTOMER")
                        .anyRequest().authenticated());

        //JWTFilter 등록
        http
                .addFilterBefore(new JwtFilter(jwtUtil, userFactory, redisTemplate), LoginFilter.class);

        // 로그인 필터 등록
        http
                .addFilterAt(new LoginFilter(authenticationManager, objectMapper, jwtUtil, refreshTokenService), UsernamePasswordAuthenticationFilter.class);

        //세션 설정
        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}
