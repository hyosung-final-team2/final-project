package kr.or.kosa.ubun2_be.domain.address.dto;


import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Positive;
import lombok.*;

@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@Setter
public class AddressRequest {

    @NotNull(message = "memberId는 필수값입니다.")
    @Positive
    private Long memberId;

    private Long addressId;

    @NotBlank(message = "주소를 입력해주세요")
    private String address;

    private String recipientName;


    @NotBlank(message = "받는 사람 전화번호를 입력해주세요")
    @Pattern(regexp = "^(010|011|016|017|018|019)-\\d{3,4}-\\d{4}$", message = "ex) 010-1234-5678")
    private String recipientPhone;

    private String addressNickname;
}