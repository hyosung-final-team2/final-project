package kr.or.kosa.ubun2_be.domain.customer.dto;

import lombok.Getter;

@Getter
public class UpdatePendingMemberRequest {
    private String pendingMemberName;
    private String pendingMemberEmail;
    private String pendingMemberPhone;
}
