package kr.or.kosa.ubun2_be.global.auth.provider;

import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import kr.or.kosa.ubun2_be.global.auth.service.CustomerUserDetailsService;
import kr.or.kosa.ubun2_be.global.auth.service.MemberUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Optional;
import java.util.function.Supplier;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationProvider implements AuthenticationProvider {

    private final MemberUserDetailsService memberUserDetailsService;
    private final CustomerUserDetailsService customerUserDetailsService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        String id = (String) authentication.getPrincipal();
        String password = (String) authentication.getCredentials();
        String role = extractRole(authentication);

        UserDetails userDetails = loadUserDetailsByRoleAndId(role, id)
                .orElseThrow(badCredentialsExceptionSupplier());

        validatePassword(password, userDetails.getPassword());

        return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
    }

    private String extractRole(Authentication authentication) {
        return authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
    }

    private Optional<UserDetails> loadUserDetailsByRoleAndId(String role, String id) {
        if (role.equals(UserRole.ROLE_CUSTOMER.name())) {
            return Optional.ofNullable(customerUserDetailsService.loadUserByUsername(id));
        } else if (role.equals(UserRole.ROLE_MEMBER.name())) {
            return Optional.ofNullable(memberUserDetailsService.loadUserByUsername(id));
        } else {
            return Optional.empty();
        }
    }

    private void validatePassword(String rawPassword, String encodedPassword) {
        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    private Supplier<AuthenticationException> badCredentialsExceptionSupplier() {
        return () -> new BadCredentialsException("Invalid username or password");
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }
}
