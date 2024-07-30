package kr.or.kosa.ubun2_be.domain.customer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.SmsRequest;
import kr.or.kosa.ubun2_be.domain.customer.service.SmsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class SmsControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private SmsService smsService;

    @Test
    void sendSms() throws Exception {
        List<SmsRequest> smsRequests = Arrays.asList(
                new SmsRequest("010-1234-1234","김철수"),
                new SmsRequest("010-9876-9876","이영희")
        );

        when(smsService.sendSms(anyList(), anyLong()))
                .thenReturn(ResponseEntity.status(HttpStatus.OK).body("메시지 전송에 성공하였습니다."));

        mockMvc.perform(post("/api/customers/sms")
                        .with(user(customer))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(smsRequests)))
                .andExpect(status().isOk())
                .andExpect(content().string("메시지 전송에 성공하였습니다."));

        verify(smsService).sendSms(anyList(), eq(customer.getUserId()));
    }
}