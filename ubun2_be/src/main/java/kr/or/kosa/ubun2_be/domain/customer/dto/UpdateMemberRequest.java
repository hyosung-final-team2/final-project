package kr.or.kosa.ubun2_be.domain.customer.dto;

import kr.or.kosa.ubun2_be.domain.address.dto.MemberDetailAddressRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.MemberDetailPaymentMethodRequest;
import lombok.Getter;
import lombok.ToString;

import java.util.List;

@Getter
@ToString
public class UpdateMemberRequest {
    private String memberName;
    private String memberEmail;
    private String memberPhone;
    private List<MemberDetailAddressRequest> addresses;
    private List<MemberDetailPaymentMethodRequest> paymentMethods;
}
