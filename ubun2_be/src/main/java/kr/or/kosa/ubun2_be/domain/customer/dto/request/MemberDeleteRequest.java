package kr.or.kosa.ubun2_be.domain.customer.dto.request;

import lombok.Getter;

@Getter
public class MemberDeleteRequest {
    private Long id;
    private Boolean isPending;
}
