package kr.or.kosa.ubun2_be.domain.address.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressRequest;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import kr.or.kosa.ubun2_be.domain.member.dto.MyAddressResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class MemberAddressControllerTest extends CommonTestSetup {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AddressService addressService;

    private List<MyAddressResponse> myAddressResponses;

    @BeforeEach
    void setUp() {
        MyAddressResponse address1 = new MyAddressResponse();
        address1.setAddressId(1L);
        address1.setAddress("서울시 강남구");
        address1.setAddressNickname("집");
        address1.setRecipientName("김철수");
        address1.setRecipientPhone("010-1234-5678");
        address1.setDefaultStatus(true);

        MyAddressResponse address2 = new MyAddressResponse();
        address2.setAddressId(2L);
        address2.setAddress("서울시 서초구");
        address2.setAddressNickname("회사");
        address2.setRecipientName("김철수");
        address2.setRecipientPhone("010-1234-5678");
        address2.setDefaultStatus(false);

        myAddressResponses = Arrays.asList(address1, address2);
    }


    @Test
    void getAddresses() throws Exception {
        when(addressService.getAddressesByMemberId(anyLong())).thenReturn(myAddressResponses);

        mockMvc.perform(get("/api/members/addresses/")
                        .with(user(customUserDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray())
                .andExpect(jsonPath("$.data.length()").value(2))
                .andExpect(jsonPath("$.data[0].addressId").value(1))
                .andExpect(jsonPath("$.data[0].address").value("서울시 강남구"))
                .andExpect(jsonPath("$.message").value("주소 목록을 성공적으로 조회했습니다."));

        verify(addressService).getAddressesByMemberId(eq(customUserDetails.getUserId()));
    }

    @Test
    void addAddress() throws Exception {
        AddressRequest addressRequest = new AddressRequest();
        addressRequest.setMemberId(1L);
        addressRequest.setAddress("서울시 강남구");
        addressRequest.setAddressNickname("새 집");
        addressRequest.setRecipientName("김철수");
        addressRequest.setRecipientPhone("010-1234-5678");

        doNothing().when(addressService).addMemberAddress(any(AddressRequest.class), anyLong());

        mockMvc.perform(post("/api/members/addresses/")
                        .with(user(customUserDetails))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(addressRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("주소를 성공적으로 추가했습니다."));

        verify(addressService).addMemberAddress(any(AddressRequest.class), eq(customUserDetails.getUserId()));
    }

    @Test
    void updateAddress() throws Exception {
        Long addressId = 1L;
        AddressRequest addressRequest = new AddressRequest();
        addressRequest.setMemberId(1L);
        addressRequest.setAddress("서울시 강남구 수정");
        addressRequest.setAddressNickname("집 수정");
        addressRequest.setRecipientName("김철수");
        addressRequest.setRecipientPhone("010-1234-5678");

        doNothing().when(addressService).updateMemberAddress(anyLong(), any(AddressRequest.class), anyLong());

        mockMvc.perform(put("/api/members/addresses/{addressId}", addressId)
                        .with(user(customUserDetails))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(addressRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("주소를 성공적으로 수정했습니다."));

        verify(addressService).updateMemberAddress(eq(addressId), any(AddressRequest.class), eq(customUserDetails.getUserId()));
    }

    @Test
    void deleteAddress() throws Exception {
        Long addressId = 1L;

        doNothing().when(addressService).deleteMemberAddress(anyLong(), anyLong());

        mockMvc.perform(delete("/api/members/addresses/{addressId}", addressId)
                        .with(user(customUserDetails)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("주소를 성공적으로 삭제했습니다."));

        verify(addressService).deleteMemberAddress(eq(addressId), eq(customUserDetails.getUserId()));
    }
}