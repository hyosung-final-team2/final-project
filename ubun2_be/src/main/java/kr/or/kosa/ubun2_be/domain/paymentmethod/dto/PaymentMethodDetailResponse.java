package kr.or.kosa.ubun2_be.domain.paymentmethod.dto;

import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class PaymentMethodDetailResponse {
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private LocalDateTime registrationDate;
    private List<MemberPaymentMethodsResponse> paymentMethods;

    public static PaymentMethodDetailResponse of(Member member, List<MemberPaymentMethodsResponse> paymentMethods) {
        return PaymentMethodDetailResponse.builder()
                .memberName(member.getMemberName())
                .memberEmail(member.getMemberEmail())
                .memberPhone(member.getMemberPhone())
                .registrationDate(member.getCreatedAt())
                .paymentMethods(paymentMethods)
                .build();
    }
}
