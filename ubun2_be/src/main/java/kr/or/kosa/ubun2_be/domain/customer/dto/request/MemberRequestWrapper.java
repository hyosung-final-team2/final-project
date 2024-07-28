package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;

@Getter
public class MemberRequestWrapper<T> {

    @NotNull(message = "pending상태를 입력해주세요")
    private boolean isPending;
    private T request;

    public MemberRequestWrapper(boolean isPending, T request) {
        this.isPending = isPending;
        this.request = request;
    }
}
