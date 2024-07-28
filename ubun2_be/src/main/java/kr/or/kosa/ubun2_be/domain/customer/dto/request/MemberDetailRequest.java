package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDetailRequest {

    @NotNull(message = "pending상태를 입력해주세요")
    private Boolean isPending;
}
