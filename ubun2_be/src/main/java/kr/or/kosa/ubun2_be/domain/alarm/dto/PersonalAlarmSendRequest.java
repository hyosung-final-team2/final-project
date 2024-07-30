package kr.or.kosa.ubun2_be.domain.alarm.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Getter
@NoArgsConstructor
public class PersonalAlarmSendRequest {

    @NotNull(message = "memberId는 필수값입니다.")
    @Positive
    private Long targetMemberId;

    @NotBlank(message = "제목을 입력해주세요")
    private String title;

    @NotBlank(message = "내용을 입력해주세요")
    private String content;

    @NotBlank(message = "링크를 입력해주세요")
    private String link;
}
