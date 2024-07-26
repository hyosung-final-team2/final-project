package kr.or.kosa.ubun2_be.domain.alarm.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.UUID;

@Getter
@NoArgsConstructor
public class Alarm implements Serializable {
    private String id;
    private String title;
    private String content;
    private Long timestamp;
    private String link;

    @Builder
    private Alarm(String id, String title, String content, Long timestamp, String link) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.timestamp = timestamp;
        this.link = link;
    }

    public static Alarm createAlarm(String title, String content, String link) {
        return Alarm.builder()
                .id(UUID.randomUUID().toString())
                .title(title)
                .content(content)
                .timestamp(System.currentTimeMillis())
                .link(link)
                .build();
    }
}