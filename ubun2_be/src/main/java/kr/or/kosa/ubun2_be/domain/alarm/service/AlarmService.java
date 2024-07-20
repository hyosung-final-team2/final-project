package kr.or.kosa.ubun2_be.domain.alarm.service;

import kr.or.kosa.ubun2_be.domain.alarm.dto.PersonalAlarmSendRequest;

public interface AlarmService {
    String sendMessageToPersonal(PersonalAlarmSendRequest request);
}
