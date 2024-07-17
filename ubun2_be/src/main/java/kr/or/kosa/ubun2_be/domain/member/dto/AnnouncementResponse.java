package kr.or.kosa.ubun2_be.domain.member.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AnnouncementResponse {
    private String announcement;
}
