package kr.or.kosa.ubun2_be.domain.customer.dto.response;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MypageDetailResponse {
    private String businessOwner;
    private String businessName;
    private String businessRegistrationNumber;
    private String businessAddress;
    private String businessOpenDate;
    private String customerName;
    private String customerPhone;
    private String logoImagePath;
    private String customerEmail;
    private String announcement;
    private String description;

    public static MypageDetailResponse of(Customer customer) {
        return MypageDetailResponse.builder()
                .businessOwner(customer.getBusinessOwner())
                .businessName(customer.getBusinessName())
                .businessRegistrationNumber(customer.getBusinessRegistrationNumber())
                .businessAddress(customer.getBusinessAddress())
                .businessOpenDate(customer.getBusinessOpenDate())
                .customerName(customer.getCustomerName())
                .customerPhone(customer.getCustomerPhone())
                .logoImagePath(customer.getLogoImagePath())
                .customerEmail(customer.getCustomerEmail())
                .announcement(customer.getAnnouncement())
                .description(customer.getDescription())
                .build();
    }
}
