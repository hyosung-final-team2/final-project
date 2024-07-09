package kr.or.kosa.ubun2_be.domain.address.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.domain.address.dto.*;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.argThat;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = AddressController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import(TestSecurityConfig.class)
class AddressControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private AddressService addressService;

    private List<AddressResponse> addressResponses;

    @BeforeEach
    void setUp() {
        addressResponses = Arrays.asList(
                new AddressResponse(1L, "user1@example.com", "김철수", "서울시 강남구", "집", "김철수", "010-1234-5678", true),
                new AddressResponse(2L, "user1@example.com", "김철수", "서울시 서초구", "회사", "김철수", "010-1234-5678", false)
        );
    }

    @Test
    @DisplayName("주소 목록을 페이지네이션과 함께 조회한다")
    void getAddresses() throws Exception {
        // Given
        PageRequest pageRequest = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "addressId"));
        Page<AddressResponse> addressPage = new PageImpl<>(addressResponses, pageRequest, addressResponses.size());

        when(addressService.getAllAddresses(any(PageRequest.class))).thenReturn(addressPage);

        // When & Then
        mockMvc.perform(get("/customers/addresses/")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "addressId,desc"))
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

        verify(addressService).getAllAddresses(any(PageRequest.class));
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
                .addresses(Arrays.asList(new AddressResponseDto(1L, "서울시 강남구")))
                .build();

        when(addressService.getMemberInfoByAddressId(any(AddressMemberDetailRequest.class))).thenReturn(response);

        // When & Then
        mockMvc.perform(get("/customers/addresses/{address_id}", request.getAddressId())
                        .contentType(MediaType.APPLICATION_JSON))
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

        verify(addressService).getMemberInfoByAddressId(argThat(req ->
                req.getAddressId().equals(addressId)
        ));
    }

    @Test
    @DisplayName("새로운 주소를 등록한다.")
    void addAddress() throws Exception {
        // Given
        AddressRequest addressRequest = AddressRequest.builder()
                .memberId(1L)
                .address("서울시 강남구 테헤란로 123")
                .recipientName("김철수")
                .recipientPhone("010-1234-5678")
                .build();

        doNothing().when(addressService).addAddress(any(AddressRequest.class));

        // When & Then
        mockMvc.perform(post("/customers/addresses/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(addressRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").doesNotExist())
                .andExpect(jsonPath("$.message").value("주소가 성공적으로 등록되었습니다."));

        verify(addressService).addAddress(any(AddressRequest.class));
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

        doNothing().when(addressService).updateAddress(addressId, addressRequest);

        // When & Then
        mockMvc.perform(put("/customers/addresses/{address_id}", addressId)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(addressRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").doesNotExist())
                .andExpect(jsonPath("$.message").value("주소가 성공적으로 수정되었습니다."));

        verify(addressService).updateAddress(eq(addressId), any(AddressRequest.class));
    }

    @Test
    @DisplayName("주소를 성공적으로 삭제한다")
    void deleteAddress_ShouldDeleteSuccessfully() throws Exception {
        // Given
        Long addressId = 1L;
        doNothing().when(addressService).deleteAddress(addressId);

        // When & Then
        mockMvc.perform(delete("/customers/addresses/{address_id}", addressId)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").doesNotExist())
                .andExpect(jsonPath("$.message").value("주소가 성공적으로 삭제되었습니다."));

        verify(addressService).deleteAddress(addressId);
    }
}
