package kr.or.kosa.ubun2_be.domain.customer.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.*;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MemberDetailResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MemberListResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MypageDetailResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.StoreInfoResponse;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import kr.or.kosa.ubun2_be.domain.member.dto.FcmTokenRequest;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.*;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
class CustomerControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private CustomerService customerService;

    @Test
    @DisplayName("고객 회원가입")
    void signupCustomer() throws Exception {
        // Given
        SignupRequest signupRequest = new SignupRequest("user123", "password1@@", "김철수", "010-1234-5678", "user@example.com", "123-45-67890", "Business", "Owner", "2023-01-01", "Address", "Description","qweqweqweqwewr");

        // When & Then
        mockMvc.perform(post("/api/customers/signup")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(signupRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("고객 회원가입 정상 완료"));

        verify(customerService).createCustomer(any(SignupRequest.class));
    }

    @Test
    @DisplayName("고객 단일 등록")
    void registerMember() throws Exception {
        // Given
        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
                .pendingMemberName("이영희")
                .pendingMemberEmail("pending@example.com")
                .pendingMemberPhone("010-1234-5678")
                .build();

        // When & Then
        mockMvc.perform(post("/api/customers/members")
                        .with(user(customer))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(registerMemberRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("회원 등록 정상 완료"));

        verify(customerService).registerMember(any(RegisterMemberRequest.class), eq(customer.getUserId()));
    }


    @Test
    @DisplayName("회원 & 가입대기회원 단일 상세조회")
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
        mockMvc.perform(get("/api/customers/members/1")
                        .param("isPending", "false")
                        .with(user(customer))
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").exists())
                .andExpect(jsonPath("$.message").value("회원 상세조회 정상 완료"));

        verify(customerService).getMemberDetail(eq(customer.getUserId()), any(Long.class), any(Boolean.class));
    }

    @Test
    @DisplayName("회원 & 가입대기 회원 수정")
    void updateMember() throws Exception {
        // Given
        RegisterMemberRequest registerMemberRequest = RegisterMemberRequest.builder()
                .pendingMemberName("이수현")
                .pendingMemberEmail("updated@example.com")
                .pendingMemberPhone("010-1234-5678")
                .build();

        MemberRequestWrapper<RegisterMemberRequest> memberRequestWrapper = new MemberRequestWrapper<>(true, registerMemberRequest);

        // When & Then
        mockMvc.perform(put("/api/customers/members/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(user(customer))
                        .content(objectMapper.writeValueAsString(memberRequestWrapper)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("회원 수정 정상 완료"));

        verify(customerService).updateMember(eq(customer.getUserId()), any(Long.class), any(MemberRequestWrapper.class));
    }

    @Test
    @DisplayName("회원 & 가입대기 회원 삭제")
    void deleteMember() throws Exception {
        // Given
        MemberDetailRequest memberDetailRequest = new MemberDetailRequest();
        memberDetailRequest.setIsPending(false);

        // When & Then
        mockMvc.perform(delete("/api/customers/members/1")
                        .with(user(customer))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(memberDetailRequest)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("회원 삭제 정상 완료"));

        verify(customerService).deleteMember(eq(customer.getUserId()), any(Long.class), any(Boolean.class));
    }


    @Test
    @DisplayName("회원 & 가입대기 회원 목록 및 정렬, 검색을 통한 회원 목록 조회")
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
        mockMvc.perform(get("/api/customers/members")
                        .param("page", "0")
                        .param("size", "8")
                        .param("sort", "createdAt,desc")
                        .contentType(MediaType.APPLICATION_JSON)
                        .with(user(customer))
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

        verify(customerService).getMembers(eq(customer.getUserId()), any(SearchRequest.class), any(Pageable.class));
    }

    @Test
    @DisplayName("고객 스토어 이름 조회")
    void getStoreName() throws Exception {
        StoreInfoResponse storeInfo = new StoreInfoResponse("Test Store");
        when(customerService.getStoreInfo(anyLong())).thenReturn(storeInfo);

        mockMvc.perform(get("/api/customers/storename")
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.businessName").value("Test Store"))
                .andExpect(jsonPath("$.message").value("정상출력 데이터"));

        verify(customerService).getStoreInfo(eq(customer.getUserId()));
    }
    @Test
    @DisplayName("고객의 기기등록 FcmToken 전송 받기")
    void updateFcmToken() throws Exception {
        FcmTokenRequest request = new FcmTokenRequest();
        request.setFcmToken("testFcmToken");

        mockMvc.perform(put("/api/customers/fcmtoken")
                        .with(user(customer))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("fcm 토큰 등록/업데이트 완료"));

        verify(customerService).updateCustomerFcmToken(eq(customer.getUserId()), any(FcmTokenRequest.class));
    }
    @Test
    @DisplayName("회원 & 가입대기 회원 리스트 삭제")
    void deleteSelectedMember() throws Exception {
        List<MemberDeleteRequest> deleteRequests = Arrays.asList(
                new MemberDeleteRequest(1L,true),
                new MemberDeleteRequest(2L,false)
        );

        mockMvc.perform(delete("/api/customers/members/selected")
                        .with(user(customer))
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(deleteRequests)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("회원 삭제 정상 완료"));

        verify(customerService).deleteSelectedProducts(anyList(), eq(customer.getUserId()));
    }
    @Test
    @DisplayName("고객 마이페이지 수정")
    void updateMyPage() throws Exception {
        MyPageUpdateRequest updateRequest = new MyPageUpdateRequest();
        updateRequest.setCustomerName("김수현");
        updateRequest.setCustomerPhone("010-1111-1111");
        updateRequest.setBusinessAddress("서울시 동작구");

        MockMultipartFile image = new MockMultipartFile("image", "test.jpg", "image/jpeg", "test image content".getBytes());
        MockMultipartFile jsonPart = new MockMultipartFile("myPageUpdateRequest", "", "application/json", objectMapper.writeValueAsString(updateRequest).getBytes());

        mockMvc.perform(multipart("/api/customers/mypage")
                        .file(image)
                        .file(jsonPart)
                        .with(request -> {
                            request.setMethod("PUT");
                            return request;
                        })
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("고객 마이페이지 수정 완료"));

        verify(customerService).updateMyPage(any(), eq(customer.getUserId()), any(MyPageUpdateRequest.class));
    }
    @Test
    @DisplayName("고객 마이페이지 조회")
    void getMyPage() throws Exception {
        MypageDetailResponse myPage = new MypageDetailResponse();
        when(customerService.getMyPage(anyLong())).thenReturn(myPage);

        mockMvc.perform(get("/api/customers/mypage")
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("고객 마이페이지 조회 완료"));

        verify(customerService).getMyPage(customer.getUserId());
    }

}
