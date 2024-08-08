package kr.or.kosa.ubun2_be.domain.customer.controller;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.*;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MemberDetailResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MemberListResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MypageDetailResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.StoreInfoResponse;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import kr.or.kosa.ubun2_be.domain.member.dto.FcmTokenRequest;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.MediaType;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;
    private static final int PAGE_SIZE = 8;
    private static final String SORT_DEFAULT = "createdAt";

    @Operation(summary = "고객 회원가입")
    @PostMapping("/signup")
    public ResponseDto<?> signupCustomer(@Valid @RequestBody SignupRequest signupRequest) {
        customerService.createCustomer(signupRequest);
        return ResponseDto.ok(null, "고객 회원가입 정상 완료");
    }

    @Operation(summary = "고객 단일 등록")
    @PostMapping("/members")
    public ResponseDto<?> registerMember(@Valid @RequestBody RegisterMemberRequest registerMemberRequest,
                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        customerService.registerMember(registerMemberRequest, customUserDetails.getUserId());
        return ResponseDto.ok(null, "회원 등록 정상 완료");
    }

    @Operation(summary = "회원 & 가입대기회원 단일 상세조회")
    @GetMapping("/members/{memberId}")
    public ResponseDto<?> getMemberDetail(@PathVariable Long memberId,
                                          @Valid @ModelAttribute MemberDetailRequest memberDetailRequest,
                                          @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        MemberDetailResponse getMember = customerService.getMemberDetail(customUserDetails.getUserId(), memberId, memberDetailRequest.getIsPending());
        return ResponseDto.ok(getMember, "회원 상세조회 정상 완료");
    }

    @Operation(summary = "회원 & 가입대기 회원 수정")
    @PutMapping("/members/{memberId}")
    public ResponseDto<?> updateMember(@PathVariable Long memberId,
                                       @Valid @RequestBody MemberRequestWrapper<?> memberRequestWrapper,
                                       @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        customerService.updateMember(customUserDetails.getUserId(), memberId, memberRequestWrapper);
        return ResponseDto.ok(null, "회원 수정 정상 완료");
    }

    @Operation(summary = "회원 & 가입대기 회원 삭제")
    @DeleteMapping("/members/{memberId}")
    public ResponseDto<?> deleteMember(@PathVariable Long memberId,
                                       @Valid @RequestBody MemberDetailRequest memberDeleteRequest,
                                       @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        customerService.deleteMember(customUserDetails.getUserId(), memberId, memberDeleteRequest.getIsPending());
        return ResponseDto.ok(null, "회원 삭제 정상 완료");
    }

    @Operation(summary = "회원 & 가입대기 회원 목록 및 정렬,검색을 통한 회원 목록 조회")
    @GetMapping("/members")
    public ResponseDto<?> getMembers(SearchRequest searchRequest,
                                     @PageableDefault(size = PAGE_SIZE, sort = SORT_DEFAULT, direction = Sort.Direction.DESC) Pageable pageable,
                                     @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Page<MemberListResponse> memberResponseList = customerService.getMembers(customUserDetails.getUserId(), searchRequest, pageable);
        return ResponseDto.ok(memberResponseList, "정상출력 데이터");
    }

    @Operation(summary = "고객 스토어 이름")
    @GetMapping("/storename")
    public ResponseDto<?> getStoreName(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        StoreInfoResponse storeInfo = customerService.getStoreInfo(customUserDetails.getUserId());
        return ResponseDto.ok(storeInfo, "정상출력 데이터");
    }

    @Operation(summary = "고객의 기기등록 FcmToken 전송 받기")
    @PutMapping("/fcmtoken")
    public ResponseDto<?> updateFcmToken(@Valid @RequestBody FcmTokenRequest fcmTokenRequest,
                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        customerService.updateCustomerFcmToken(customUserDetails.getUserId(), fcmTokenRequest);
        return ResponseDto.ok(null, "fcm 토큰 등록/업데이트 완료");
    }

    @Operation(summary = "회원 & 가입대기 회원 리스트 삭제")
    @DeleteMapping("/members/selected")
    public ResponseDto<?> deleteSelectedMember(@Valid @RequestBody List<MemberDeleteRequest> memberDeleteRequestList,
                                               @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        customerService.deleteSelectedProducts(memberDeleteRequestList, customUserDetails.getUserId());
        return ResponseDto.ok(null, "회원 삭제 정상 완료");
    }

    @Operation(summary = "고객 마이페이지 수정")
    @PutMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, value = "/mypage")
    public ResponseDto<?> updateMyPage(@RequestPart(value = "image", required = false) MultipartFile image, @Valid @RequestPart MyPageUpdateRequest myPageUpdateRequest, @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        customerService.updateMyPage(image, customUserDetails.getUserId(), myPageUpdateRequest);
        return ResponseDto.ok(null, "고객 마이페이지 수정 완료");
    }

    @Operation(summary = "고객 마이페이지 조회")
    @GetMapping("/mypage")
    public ResponseDto<?> getMyPage(@AuthenticationPrincipal CustomUserDetails customUserDetails) {
        MypageDetailResponse myPage = customerService.getMyPage(customUserDetails.getUserId());
        return ResponseDto.ok(myPage, "고객 마이페이지 조회 완료");
    }

}
