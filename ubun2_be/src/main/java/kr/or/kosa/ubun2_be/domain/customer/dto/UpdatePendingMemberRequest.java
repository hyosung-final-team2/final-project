package kr.or.kosa.ubun2_be.domain.customer.dto;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class UpdatePendingMemberRequest {
    private String pendingMemberName;
    private String pendingMemberEmail;
    private String pendingMemberPhone;
}
