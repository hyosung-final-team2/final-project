package kr.or.kosa.ubun2_be.domain.alarm.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.alarm.dto.GroupAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.dto.PersonalAlarmSendRequest;
import kr.or.kosa.ubun2_be.domain.alarm.entity.Alarm;
import kr.or.kosa.ubun2_be.domain.alarm.service.AlarmService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class AlarmControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AlarmService alarmService;

    @Test
    @DisplayName("단일 구매자에게 알람 보내기")
    void pushMessagePersonal() throws Exception {
        PersonalAlarmSendRequest request = new PersonalAlarmSendRequest(1L,"알림제목","알림 내용","해당 링크");

        when(alarmService.sendMessageToPersonal(any(PersonalAlarmSendRequest.class))).thenReturn("messageId");

        mockMvc.perform(post("/api/customers/alarm/personal")
                        .with(user(customer))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("개인 알람 전송 성공"));

        verify(alarmService).sendMessageToPersonal(any(PersonalAlarmSendRequest.class));
    }

    @Test
    @DisplayName("고객의 상점에 구독되어있는 회원 전체에게 알람 보내기")
    void pushMessageGroup() throws Exception {
        GroupAlarmSendRequest request = new GroupAlarmSendRequest(1L,"알림제목","알림내용","알림 링크");

        mockMvc.perform(post("/api/customers/alarm/group")
                        .with(user(customer))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("토픽 알람 전송 성공"));

        verify(alarmService).sendMessageToGroup(any(GroupAlarmSendRequest.class));
    }

    @Test
    @DisplayName("회원별 알림 조회")
    void getMemberPushMessages() throws Exception {
        Long memberId = 1L;
        List<Alarm> alarms = Arrays.asList(new Alarm(), new Alarm());

        when(alarmService.getMemberPushMessages(memberId)).thenReturn(alarms);

        mockMvc.perform(get("/api/members/alarm/{memberId}", memberId)
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("메시지 조회 성공"))
                .andExpect(jsonPath("$.data").isArray());

        verify(alarmService).getMemberPushMessages(memberId);
    }

    @Test
    @DisplayName("회원 알림 읽음 처리")
    void markAlarmAsRead() throws Exception {
        Long memberId = 1L;
        String alarmId = "member_alarm:"+memberId;

        mockMvc.perform(delete("/api/members/alarm/{memberId}/{alarmId}", memberId, alarmId)
                        .with(user(member)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("알림 읽음 처리 완료"));

        verify(alarmService).markAsRead(memberId, alarmId);
    }

    @Test
    @DisplayName("고객별 알림 조회")
    void getCustomerPushMessages() throws Exception {
        Long customerId = 1L;
        List<Alarm> alarms = Arrays.asList(new Alarm(), new Alarm());

        when(alarmService.getCustomerPushMessages(customerId)).thenReturn(alarms);

        mockMvc.perform(get("/api/customers/alarm/{customerId}", customerId)
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("메시지 조회 성공"))
                .andExpect(jsonPath("$.data").isArray());

        verify(alarmService).getCustomerPushMessages(customerId);
    }

    @Test
    @DisplayName("고객 알림 읽음 처리")
    void markCustomerAlarmAsRead() throws Exception {
        Long customerId = 1L;
        String alarmId = "alarm:"+customerId;

        mockMvc.perform(delete("/api/customers/alarm/{customerId}/{alarmId}", customerId, alarmId)
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("고객 알림 읽음 처리 완료"));

        verify(alarmService).markCustomerAlarmAsRead(customerId, alarmId);
    }
}