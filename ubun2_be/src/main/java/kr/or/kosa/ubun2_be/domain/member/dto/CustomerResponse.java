package kr.or.kosa.ubun2_be.domain.member.dto;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CustomerResponse { //customer 조회
    private Long customerId;
    private String businessName;
    private String description;
    private String logoImagePath;

    public CustomerResponse(Customer customer) {
        this.customerId = customer.getCustomerId();
        this.businessName = customer.getBusinessName();
        this.description = customer.getDescription();
        this.logoImagePath = customer.getLogoImagePath();
    }
}
