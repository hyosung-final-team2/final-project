package kr.or.kosa.ubun2_be.domain.alarm.repository;

import kr.or.kosa.ubun2_be.domain.alarm.entity.Alarm;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class CustomerAlarmRedisRepository {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String ALARM_PREFIX = "customer_alarm:";

    public void saveAlarm(String customerId, Alarm alarm) {
        String key = ALARM_PREFIX + customerId;
        redisTemplate.opsForList().rightPush(key, alarm);
        redisTemplate.expire(key, 90, TimeUnit.DAYS);
    }

    public List<Object> findAlarmsByCustomerId(String customerId) {
        String key = ALARM_PREFIX + customerId;
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    public void removeAlarmById(String customerId, String alarmId) {
        String key = ALARM_PREFIX + customerId;
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
