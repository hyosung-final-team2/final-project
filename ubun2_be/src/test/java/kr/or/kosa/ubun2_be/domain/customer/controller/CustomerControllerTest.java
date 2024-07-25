package kr.or.kosa.ubun2_be.domain.customer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.domain.address.controller.TestSecurityConfig;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.*;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MemberDetailResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MemberListResponse;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.auth.model.UserType;
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
import org.springframework.security.test.context.support.WithUserDetails;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = CustomerController.class)
@MockBean(JpaMetamodelMappingContext.class)
@Import({TestSecurityConfig.class, TestUserDetailsService.class})
class CustomerControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CustomerService customerService;

    private CustomUserDetails customUserDetails;

    @BeforeEach
    void setUp() {
        customUserDetails = new CustomUserDetails(
                new UserType() {
                    @Override
                    public Long getId() {
                        return 1L;
                    }

                    @Override
                    public String getLoginId() {
                        return "testuser";
                    }

                    @Override
                    public String getPassword() {
                        return "password";
                    }

                    @Override
                    public String getRole() {
                        return "ROLE_USER";
                    }
                }
        );
    }

    @Test
    @DisplayName("고객 회원가입")
    void signupCustomer() throws Exception {
        // Given
        SignupRequest signupRequest = new SignupRequest("user", "password", "User", "010-1234-5678", "user@example.com", "123-45-67890", "Business", "Owner", "2023-01-01", "Address", "Description","qweqweqweqwewr");

        // When & Then
        mockMvc.perform(post("/customers/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signupRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("고객 회원가입 정상 완료"));

        verify(customerService).createCustomer(any(SignupRequest.class));
    }

    @Test
    @DisplayName("고객 단일 등록")
    @WithUserDetails("testuser")
    void registerMember() throws Exception {
        // Given
        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
                .pendingMemberName("Pending Member")
                .pendingMemberEmail("pending@example.com")
                .pendingMemberPhone("010-1234-5678")
                .build();

        // When & Then
        mockMvc.perform(post("/customers/members")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerMemberRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("회원 등록 정상 완료"));

        verify(customerService).registerMember(any(RegisterMemberRequest.class), any(Long.class));
    }


    @Test
    @DisplayName("회원 & 가입대기회원 단일 상세조회")
    @WithUserDetails(value = "testuser", userDetailsServiceBeanName = "userDetailsService")
    void getMemberDetail() throws Exception {
        // Given
        MemberDetailResponse memberDetailResponse = MemberDetailResponse.builder()
                .memberName("test")
                .memberEmail("test@example.com")
                .memberPhone("010-1234-5678")
                .createdAt(LocalDateTime.now())
                .addresses(Collections.emptyList())
                .paymentMethods(Collections.emptyList())
                .build();

        when(customerService.getMemberDetail(any(Long.class), any(Long.class), any(Boolean.class)))
                .thenReturn(memberDetailResponse);

        // When & Then
        mockMvc.perform(get("/customers/members/1")
                        .param("isPending", "false")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").exists())
                .andExpect(jsonPath("$.message").value("회원 상세조회 정상 완료"));

        verify(customerService).getMemberDetail(any(Long.class), any(Long.class), any(Boolean.class));
    }

    @Test
    @DisplayName("회원 & 가입대기 회원 수정")
    @WithUserDetails(value = "testuser", userDetailsServiceBeanName = "userDetailsService")
    void updateMember() throws Exception {
        // Given
        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
                .pendingMemberName("Updated Member")
                .pendingMemberEmail("updated@example.com")
                .pendingMemberPhone("010-1234-5678")
                .build();

        MemberRequestWrapper<RegisterMemberRequest> memberRequestWrapper = new MemberRequestWrapper<>(true, registerMemberRequest);

        // When & Then
        mockMvc.perform(put("/customers/members/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(memberRequestWrapper)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("회원 수정 정상 완료"));

        verify(customerService).updateMember(any(Long.class), any(Long.class), any(MemberRequestWrapper.class));
    }

    @Test
    @DisplayName("회원 & 가입대기 회원 삭제")
    @WithUserDetails(value = "testuser", userDetailsServiceBeanName = "userDetailsService")
    void deleteMember() throws Exception {
        // Given
        MemberDetailRequest memberDetailRequest = new MemberDetailRequest();
        memberDetailRequest.setIsPending(false);

        // When & Then
        mockMvc.perform(delete("/customers/members/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(memberDetailRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("회원 삭제 정상 완료"));

        verify(customerService).deleteMember(any(Long.class), any(Long.class), any(Boolean.class));
    }


    @Test
    @DisplayName("회원 & 가입대기 회원 목록 및 정렬, 검색을 통한 회원 목록 조회")
    @WithUserDetails(value = "testuser", userDetailsServiceBeanName = "userDetailsService")
    void getMembers() throws Exception {
        // Given
        SearchRequest searchRequest = new SearchRequest();
        PageRequest pageRequest = PageRequest.of(0, 8, Sort.by(Sort.Direction.DESC, "createdAt"));

        MemberListResponse memberResponse = new MemberListResponse(
                Member.builder()
                        .memberId(1L)
                        .memberEmail("test@example.com")
                        .memberName("Test User")
                        .memberPhone("010-1234-5678")
                        .build()
        );

        Page<MemberListResponse> memberResponsePage = new PageImpl<>(List.of(memberResponse), pageRequest, 1);

        when(customerService.getMembers(any(Long.class), any(SearchRequest.class), any(Pageable.class)))
                .thenReturn(memberResponsePage);

        // When & Then
        mockMvc.perform(get("/customers/members")
                        .param("page", "0")
                        .param("size", "8")
                        .param("sort", "createdAt,desc")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(searchRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.content").isArray())
                .andExpect(jsonPath("$.data.content[0].memberId").value(1))
                .andExpect(jsonPath("$.data.content[0].memberEmail").value("test@example.com"))
                .andExpect(jsonPath("$.data.content[0].memberName").value("Test User"))
                .andExpect(jsonPath("$.data.content[0].memberPhone").value("010-1234-5678"))
                .andExpect(jsonPath("$.data.totalElements").value(1))
                .andExpect(jsonPath("$.data.totalPages").value(1))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(customerService).getMembers(any(Long.class), any(SearchRequest.class), any(Pageable.class));
    }

}
