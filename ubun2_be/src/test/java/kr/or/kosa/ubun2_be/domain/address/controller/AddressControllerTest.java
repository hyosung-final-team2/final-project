package kr.or.kosa.ubun2_be.domain.address.controller;

import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import kr.or.kosa.ubun2_be.domain.address.dto.AddressResponse;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = AddressController.class)
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser
class AddressControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private AddressService addressService;

    @Test
    @DisplayName("주소 목록을 전체 조회한다.")
    void getAddresses() throws Exception {
        Pageable pageable = PageRequest.of(0, 10, Sort.by(Sort.Direction.DESC, "addressId"));

        Member member1 = Member.builder()
                .memberEmail("test@email.com")
                .memberName("Test User")
                .memberPhone("010-1234-5678")
                .build();

        Member member2 = Member.builder()
                .memberEmail("test2@email.com")
                .memberName("Test User 2")
                .memberPhone("010-9876-5432")
                .build();

        Address address1 = Address.builder()
                .addressId(1L)
                .member(member1)
                .addressNickname("Home")
                .recipientName("Test User")
                .recipientPhone("010-1234-5678")
                .defaultStatus(true)
                .address("Test Address 1")
                .build();

        Address address2 = Address.builder()
                .addressId(2L)
                .member(member2)
                .addressNickname("Office")
                .recipientName("Test User 2")
                .recipientPhone("010-9876-5432")
                .defaultStatus(true)
                .address("Test Address 2")
                .build();

        Page<AddressResponse> addressResponsePage = new PageImpl<>(List.of(
                new AddressResponse(address1),
                new AddressResponse(address2)
        ));

        given(addressService.getAllAddresses(any(Pageable.class))).willReturn(addressResponsePage);

        // when & then
        mockMvc.perform(get("/customers/addresses/")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.data.content", hasSize(2)))
                .andExpect(jsonPath("$.data.content[0].addressId").value(1))
                .andExpect(jsonPath("$.data.content[0].memberEmail").value("test@email.com"))
                .andExpect(jsonPath("$.data.content[0].memberName").value("Test User"))
                .andExpect(jsonPath("$.data.content[0].address").value("Test Address 1"))
                .andExpect(jsonPath("$.data.content[1].addressId").value(2))
                .andExpect(jsonPath("$.data.content[1].memberEmail").value("test2@email.com"))
                .andExpect(jsonPath("$.data.content[1].memberName").value("Test User 2"))
                .andExpect(jsonPath("$.data.content[1].address").value("Test Address 2"))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"))
                .andDo(print())
                .andExpect(status().isOk());

        verify(addressService).getAllAddresses(any(Pageable.class));
    }

}
