package kr.or.kosa.ubun2_be.domain.customer.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PendingMemberDetailResponse {
    private String pendingMemberName;
    private String pendingMemberEmail;
    private String pendingMemberPhone;
    private String pendingMemberAddress;
    private String pendingMemberCardCompanyName;
    private String pendingMemberCardNumber;
    private String pendingMemberBankName;
    private String pendingMemberAccountNumber;
}
