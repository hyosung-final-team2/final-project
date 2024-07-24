package kr.or.kosa.ubun2_be.domain.alarm.repository;

import kr.or.kosa.ubun2_be.domain.alarm.entity.Alarm;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class MemberAlarmRedisRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String ALARM_PREFIX = "member_alarm:";

    public void saveAlarm(String memberId, Alarm alarm) {
        String key = ALARM_PREFIX + memberId;
        redisTemplate.opsForList().rightPush(key, alarm);
        redisTemplate.expire(key, 90, TimeUnit.DAYS);
    }

    public List<Object> findAlarmsByMemberId(String memberId) {
        String key = ALARM_PREFIX + memberId;
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    public void removeAlarmById(String memberId, String alarmId) {
        String key = ALARM_PREFIX + memberId;
        List<Object> alarms = redisTemplate.opsForList().range(key, 0, -1);
        if (alarms != null) {
            for (Object obj : alarms) {
                if (obj instanceof Alarm alarm) {
                    if (alarm.getId().equals(alarmId)) {
                        redisTemplate.opsForList().remove(key, 1, alarm);
                        break;
                    }
                }
            }
        }
    }

}