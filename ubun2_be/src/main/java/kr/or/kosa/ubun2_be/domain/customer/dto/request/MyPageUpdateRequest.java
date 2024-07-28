package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class MyPageUpdateRequest {
    private String customerName;
    private String customerPhone;
    private String businessAddress;
    private String description;
    private String announcement;
}
