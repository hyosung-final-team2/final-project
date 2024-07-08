package kr.or.kosa.ubun2_be.domain.customer.dto;

import lombok.Getter;

@Getter
public class MemberRequestWrapper<T> {
    private boolean isPending;
    private T request;

    public MemberRequestWrapper(boolean isPending, T request) {
        this.isPending = isPending;
        this.request = request;
    }
}
