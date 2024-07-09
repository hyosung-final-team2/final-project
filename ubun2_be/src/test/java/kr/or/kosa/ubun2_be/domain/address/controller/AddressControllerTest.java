package kr.or.kosa.ubun2_be.domain.address.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
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

}
