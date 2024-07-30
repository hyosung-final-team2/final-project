package kr.or.kosa.ubun2_be.common;

import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.auth.model.UserType;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
@AutoConfigureMockMvc
public class CommonTestSetup {
    protected CustomUserDetails customer;
    protected CustomUserDetails member;

    @BeforeEach
    void setUpCustomUserDetails() {
        customer = new CustomUserDetails(
                new UserType() {
                    @Override
                    public Long getId() {
                        return 1L;
                    }

                    @Override
                    public String getLoginId() {
                        return "testCustomer";
                    }

                    @Override
                    public String getPassword() {
                        return "password";
                    }

                    @Override
                    public String getRole() {
                        return "ROLE_CUSTOMER";
                    }
                }
        );
        member = new CustomUserDetails(
                new UserType() {
                    @Override
                    public Long getId() {
                        return 1L;
                    }

                    @Override
                    public String getLoginId() {
                        return "testMember";
                    }

                    @Override
                    public String getPassword() {
                        return "password";
                    }

                    @Override
                    public String getRole() {
                        return "ROLE_MEMBER";
                    }
                }
        );
    }
}
