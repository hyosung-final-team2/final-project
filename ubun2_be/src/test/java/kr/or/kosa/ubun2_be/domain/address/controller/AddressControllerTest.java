package kr.or.kosa.ubun2_be.domain.address.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.address.dto.*;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class AddressControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AddressService addressService;

    private List<AddressResponse> addressResponses;

    @BeforeEach
    void setUp() {

        AddressResponse addressResponse1 = new AddressResponse();
        addressResponse1.setAddressId(1L);
        addressResponse1.setMemberEmail("user1@example.com");
        addressResponse1.setMemberName("김철수");
        addressResponse1.setAddress("서울시 강남구");
        addressResponse1.setAddressNickname("집");
        addressResponse1.setRecipientName("김철수");
        addressResponse1.setRecipientPhone("010-1234-5678");
        addressResponse1.setDefaultStatus(true);


        AddressResponse addressResponse2 = new AddressResponse();
        addressResponse2.setAddressId(2L);
        addressResponse2.setMemberEmail("user1@example.com");
        addressResponse2.setMemberName("김철수");
        addressResponse2.setAddress("서울시 서초구");
        addressResponse2.setAddress("회사");
        addressResponse2.setRecipientName("김철수");
        addressResponse2.setRecipientPhone("010-1234-5678");
        addressResponse2.setDefaultStatus(false);

        addressResponses = Arrays.asList(addressResponse1, addressResponse2);
    }

    @Test
    @DisplayName("주소 목록을 페이지네이션과 함께 조회한다")
    void getAddresses() throws Exception {
        // Given
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "addressId"));
        Page<AddressResponse> addressPage = new PageImpl<>(addressResponses, pageRequest, addressResponses.size());

        when(addressService.getAllAddresses(any(PageRequest.class),any(),anyLong())).thenReturn(addressPage);

        // When & Then
        mockMvc.perform(get("/api/customers/addresses")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "addressId,desc")
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.content.length()").value(2))
                .andExpect(jsonPath("$.data.content[0].addressId").value(1))
                .andExpect(jsonPath("$.data.content[0].memberEmail").value("user1@example.com"))
                .andExpect(jsonPath("$.data.content[0].memberName").value("김철수"))
                .andExpect(jsonPath("$.data.content[0].address").value("서울시 강남구"))
                .andExpect(jsonPath("$.data.totalElements").value(2))
                .andExpect(jsonPath("$.data.totalPages").value(1))
                .andExpect(jsonPath("$.message").value("주소 목록을 성공적으로 조회했습니다."));

        verify(addressService).getAllAddresses(any(PageRequest.class),any(),eq(customer.getUserId()));
    }

    @Test
    @DisplayName("주소아이디로 회원 정보를 조회한다")
    void getMemberAddressInfo() throws Exception {
        // Given
        Long addressId = 1L;
        AddressMemberDetailRequest request = AddressMemberDetailRequest.builder()
                .addressId(addressId)
                .build();

        AddressMemberInfoResponse response = AddressMemberInfoResponse.builder()
                .memberName("김철수")
                .memberPhone("010-1234-5678")
                .memberEmail("user1@example.com")
                .registrationDate(LocalDateTime.now())
                .addresses(Arrays.asList(new MemberDetailAddressResponse(1L,"서울시 강남구")))
                .build();

        when(addressService.getMemberInfoByAddressId(anyLong(),anyLong())).thenReturn(response);

        // When & Then
        mockMvc.perform(get("/api/customers/addresses/{address_id}", request.getAddressId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.memberName").value("김철수"))
                .andExpect(jsonPath("$.data.memberPhone").value("010-1234-5678"))
                .andExpect(jsonPath("$.data.memberEmail").value("user1@example.com"))
                .andExpect(jsonPath("$.data.addresses").isArray())
                .andExpect(jsonPath("$.data.addresses.length()").value(1))
                .andExpect(jsonPath("$.data.addresses[0].addressId").value(1))
                .andExpect(jsonPath("$.data.addresses[0].address").value("서울시 강남구"))
                .andExpect(jsonPath("$.message").value("주소 상세를 성공적으로 조회했습니다."));

    }

    @Test
    @DisplayName("새로운 주소를 등록한다.")
    void addAddress() throws Exception {
        // Given
        AddressRequest addressRequest = AddressRequest.builder()
                .memberId(1L)
                .addressId(1L)
                .address("서울시 강남구 테헤란로 123")
                .recipientName("김철수")
                .recipientPhone("010-1234-5678")
                .build();

        doNothing().when(addressService).addAddress(any(AddressRequest.class),anyLong());

        // When & Then
        mockMvc.perform(post("/api/customers/addresses/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(addressRequest))
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").doesNotExist())
                .andExpect(jsonPath("$.message").value("주소가 성공적으로 등록되었습니다."));

        verify(addressService).addAddress(any(AddressRequest.class),eq(customer.getUserId()));
    }

    @Test
    @DisplayName("주소를 성공적으로 수정한다")
    void updateAddress() throws Exception {
        // Given
        Long addressId = 12L;
        AddressRequest addressRequest = AddressRequest.builder()
                .memberId(1L)
                .addressId(addressId)
                .address("서울시 강남구 테헤란로 123")
                .recipientName("홍길동")
                .recipientPhone("010-1234-5678")
                .build();

        doNothing().when(addressService).updateAddress(anyLong(),any(),anyLong());

        // When & Then
        mockMvc.perform(put("/api/customers/addresses/{address_id}", addressId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(addressRequest))
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").doesNotExist())
                .andExpect(jsonPath("$.message").value("주소가 성공적으로 수정되었습니다."));

        verify(addressService).updateAddress(eq(addressId), any(AddressRequest.class),eq(customer.getUserId()));
    }

    @Test
    @DisplayName("주소를 성공적으로 삭제한다")
    void deleteAddress_ShouldDeleteSuccessfully() throws Exception {
        // Given
        Long addressId = 1L;
        doNothing().when(addressService).deleteAddress(anyLong(),anyLong());

        // When & Then
        mockMvc.perform(delete("/api/customers/addresses/{address_id}", addressId)
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").doesNotExist())
                .andExpect(jsonPath("$.message").value("주소가 성공적으로 삭제되었습니다."));

        verify(addressService).deleteAddress(eq(addressId),eq(customer.getUserId()));
    }
}
