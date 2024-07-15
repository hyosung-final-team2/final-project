package kr.or.kosa.ubun2_be.global.auth.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class FindIdResponse {
    private String loginId;

    @Builder
    private FindIdResponse(String loginId) {
        this.loginId = loginId;
    }

    public static FindIdResponse createFindId(String loginId) {
        return FindIdResponse.builder()
                .loginId(loginId)
                .build();
    }
}
