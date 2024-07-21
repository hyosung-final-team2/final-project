package kr.or.kosa.ubun2_be.domain.alarm.service;

import kr.or.kosa.ubun2_be.domain.alarm.dto.GroupAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.dto.PersonalAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.entity.Alarm;

import java.util.List;

public interface AlarmService {
    String sendMessageToPersonal(PersonalAlarmSendRequest request);

    void subscribeCustomer(String FcmToken, Long customerId);

    void unsubscribeCustomer(String FcmToken, Long customerId);

    void sendMessageToGroup(GroupAlarmSendRequest request);

    List<Alarm> getPushMessages(Long memberId);

    void markAsRead(Long memberId, String alarmId);
}
