package kr.or.kosa.ubun2_be.domain.address.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class AddressRequest {

    @NotNull(message = "memberId는 필수값입니다.")
    @Positive
    private Long memberId;

    @NotNull(message = "addressId는 필수값입니다.")
    @Min(value = 0, message = "addressId는 0 이상의 값이어야 합니다.")
    private Long addressId;

    @NotBlank(message = "주소를 입력해주세요")
    private String address;

    private String recipientName;

    @Pattern(regexp = "^(010|011|016|017|018|019)\\d{3,4}\\d{4}$", message = "ex) 01012345678")
    private String recipientPhone;

    private String addressNickname;
}