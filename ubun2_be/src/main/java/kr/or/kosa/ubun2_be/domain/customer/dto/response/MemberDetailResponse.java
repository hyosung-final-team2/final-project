package kr.or.kosa.ubun2_be.domain.customer.dto.response;

import kr.or.kosa.ubun2_be.domain.address.dto.MemberDetailAddressResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.MemberPaymentMethodsResponse;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
public class MemberDetailResponse {
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private LocalDateTime createdAt;
    private List<MemberDetailAddressResponse> addresses;
    private List<MemberPaymentMethodsResponse> paymentMethods;
}
