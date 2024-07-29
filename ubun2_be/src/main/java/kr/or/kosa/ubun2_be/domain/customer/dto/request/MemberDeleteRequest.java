package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Getter;

@Getter
public class MemberDeleteRequest {
    @NotNull(message = "id는 필수값입니다.")
    @Positive
    private Long id;

    @NotNull(message = "pending상태를 입력해주세요")
    private Boolean isPending;
}
