package kr.or.kosa.ubun2_be.domain.customer.controller;

import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.auth.model.UserType;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

@Configuration
public class TestUserDetailsService {

    @Bean
    public UserDetailsService userDetailsService() {
        return new UserDetailsService() {
            @Override
            public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
                if ("testuser".equals(username)) {
                    UserType userType = new UserType() {
                        @Override
                        public Long getId() {
                            return 1L;
                        }

                        @Override
                        public String getLoginId() {
                            return "testuser";
                        }

                        @Override
                        public String getPassword() {
                            return "password";
                        }

                        @Override
                        public String getRole() {
                            return "ROLE_USER";
                        }
                    };
                    return new CustomUserDetails(userType);
                } else {
                    throw new UsernameNotFoundException(username);
                }
            }
        };
    }
}