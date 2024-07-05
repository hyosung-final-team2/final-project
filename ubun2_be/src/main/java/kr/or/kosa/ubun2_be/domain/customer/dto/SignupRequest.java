package kr.or.kosa.ubun2_be.domain.customer.dto;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
public class SignupRequest {
    private String customerLoginId;
    private String customerPassword;
    private String customerName;
    private String customerPhone;
    private String customerEmail;
    private String businessRegistrationNumber;
    private String businessName;
    private String businessOwner;
    private String businessOpenDate;
    private String businessAddress;
    private String description;

    public Customer toEntity(PasswordEncoder passwordEncoder) {
        return Customer.builder()
                .customerLoginId(customerLoginId)
                .customerPassword(passwordEncoder.encode(customerPassword))
                .customerName(customerName)
                .customerPhone(customerPhone)
                .customerEmail(customerEmail)
                .businessRegistrationNumber(businessRegistrationNumber)
                .businessName(businessName)
                .businessOwner(businessOwner)
                .businessOpenDate(businessOpenDate)
                .businessAddress(businessAddress)
                .description(description)
                .userRole(UserRole.ROLE_CUSTOMER)
                .build();
    }
}