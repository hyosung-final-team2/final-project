package kr.or.kosa.ubun2_be.domain.member.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;

@Getter
public class FcmTokenRequest {

    @NotBlank(message = "fcmToken을 입력해주세요")
    private String fcmToken;
}
