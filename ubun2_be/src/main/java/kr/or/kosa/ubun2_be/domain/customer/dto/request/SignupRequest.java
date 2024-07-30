package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@AllArgsConstructor
public class SignupRequest {

    @NotBlank(message = "로그인 ID를 입력해주세요")
    @Pattern(regexp = "^[A-Za-z0-9]{6,}$", message = "알파벳과 숫자 6자리 이상")
    private String customerLoginId;

    @NotBlank(message = "비밀번호를 입력해주세요")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$", message = "알파벳, 숫자, 특수문자를 포함한 8자리 이상")
    private String customerPassword;

    @NotBlank(message = "이름을 입력해주세요")
    @Pattern(regexp = "[가-힣a-zA-Z]+", message = "이름을 입력해주세요")
    private String customerName;

    @NotBlank(message = "전화번호를 입력해주세요")
    @Pattern(regexp = "^(010|011|016|017|018|019)-\\d{3,4}-\\d{4}$", message = "ex) 010-1234-5678")
    private String customerPhone;

    @NotBlank(message = "이메일을 입력해주세요")
    @Pattern(regexp = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", message = "이메일 형식에 맞게 입력해주세요")
    private String customerEmail;

    @NotBlank(message = "사업자등록번호는 필수입니다")
    @Pattern(regexp = "^\\d{3}-\\d{2}-\\d{5}$", message = "올바른 사업자등록번호 형식이 아닙니다.")
    private String businessRegistrationNumber;

    @NotBlank(message = "상호명을 입력해주세요")
    @Pattern(regexp = "[가-힣a-zA-Z]+", message = "상호명을 입력해주세요")
    private String businessName;

    @NotBlank(message = "대표자명을 입력해주세요")
    @Pattern(regexp = "[가-힣a-zA-Z]+", message = "이름을 입력해주세요")
    private String businessOwner;

    @NotBlank(message = "개업일자를 선택해주세요")
    @Pattern(regexp = "^\\d{4}-\\d{2}-\\d{2}$", message = "올바른 날짜 형식이 아닙니다. (YYYY-MM-DD)")
    private String businessOpenDate;

    @NotBlank(message = "사업장 주소를 입력해주세요")
    private String businessAddress;

    private String description;

    @NotBlank(message = "fcmToken을 입력해주세요")
    private String fcmToken;

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
                .fcmToken(fcmToken)
                .userRole(UserRole.ROLE_CUSTOMER)
                .build();
    }
}