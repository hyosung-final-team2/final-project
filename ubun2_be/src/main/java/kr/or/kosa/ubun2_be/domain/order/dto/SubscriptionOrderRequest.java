package kr.or.kosa.ubun2_be.domain.order.dto;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class SubscriptionOrderRequest {

    @NotNull(message = "customerId는 필수값입니다.")
    @Positive
    private Long customerId;

    @NotNull(message = "paymentMethodId는 필수값입니다.")
    @Positive
    private Long paymentMethodId;

    @NotBlank(message = "결제수단 종류를 입력해주세요")
    private String paymentType;

    @NotNull(message = "addressId는 필수값입니다.")
    @Positive
    private Long addressId;

    @Min(value = 0, message = "배송주기는 0 이상이어야 합니다.")
    private int intervalDays;

    @NotEmpty(message = "주문 상품 ID 목록은 비어있을 수 없습니다.")
    @Size(min = 1, message = "최소 하나 이상의 상품 ID가 필요합니다.")
    private List<SubscriptionOrderProductRequest> subscriptionOrderProducts;

}
