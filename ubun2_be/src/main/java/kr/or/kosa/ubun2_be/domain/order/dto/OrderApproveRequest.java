package kr.or.kosa.ubun2_be.domain.order.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderApproveRequest {

    @NotNull(message = "orderId는 필수값입니다.")
    @Positive
    private Long orderId;

    @NotBlank(message = "주문상태를 입력해주세요")
    private String orderStatus;
}
