package kr.or.kosa.ubun2_be.domain.customer.dto;

import lombok.Getter;

@Getter
public class MemberDetailResponseWrapper<T> {
    private T response;

    public MemberDetailResponseWrapper(T response) {
        this.response = response;
    }
}
