package kr.or.kosa.ubun2_be.domain.alarm.repository;

import kr.or.kosa.ubun2_be.domain.alarm.entity.Alarm;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class AlarmRedisRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String ALARM_PREFIX = "alarm:";

    public void saveAlarm(String memberId, Alarm alarm) {
        String key = ALARM_PREFIX + memberId;
        redisTemplate.opsForList().rightPush(key, alarm);
        redisTemplate.expire(key, 90, TimeUnit.DAYS);
    }

    public List<Object> findAlarmsByMemberId(String memberId) {
        String key = ALARM_PREFIX + memberId;
        return redisTemplate.opsForList().range(key, 0, -1);
    }

}