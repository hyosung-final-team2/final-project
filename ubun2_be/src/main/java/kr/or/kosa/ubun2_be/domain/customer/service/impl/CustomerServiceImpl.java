package kr.or.kosa.ubun2_be.domain.customer.service.impl;


import com.fasterxml.jackson.databind.ObjectMapper;
import kr.or.kosa.ubun2_be.domain.address.dto.MemberDetailAddressRequest;
import kr.or.kosa.ubun2_be.domain.address.dto.MemberDetailAddressResponse;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.address.exception.AddressException;
import kr.or.kosa.ubun2_be.domain.address.exception.AddressExceptionType;
import kr.or.kosa.ubun2_be.domain.address.repository.AddressRepository;
import kr.or.kosa.ubun2_be.domain.alarm.event.SubscribeAlarmEvent;
import kr.or.kosa.ubun2_be.domain.alarm.event.UnSubscribeAlarmEvent;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.*;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MemberDetailResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MemberListResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.MypageDetailResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.response.StoreInfoResponse;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerExceptionType;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import kr.or.kosa.ubun2_be.domain.member.dto.FcmTokenRequest;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.entity.MemberCustomer;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.member.MemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.exception.pendingmember.PendingMemberException;
import kr.or.kosa.ubun2_be.domain.member.exception.pendingmember.PendingMemberExceptionType;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberCustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.domain.member.repository.PendingMemberRepository;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.MemberDetailPaymentMethodRequest;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.MemberPaymentMethodsResponse;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.AccountPaymentRepository;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.CardPaymentRepository;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.PaymentMethodRepository;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.product.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final MemberRepository memberRepository;
    private final AddressRepository addressRepository;
    private final PendingMemberRepository pendingMemberRepository;
    private final MemberCustomerRepository memberCustomerRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final CardPaymentRepository cardPaymentRepository;
    private final AccountPaymentRepository accountPaymentRepository;
    private final PasswordEncoder passwordEncoder;
    private final ObjectMapper objectMapper;
    //private final AlarmService alarmService;
    private final ImageService imageService;
    private final ApplicationEventPublisher eventPublisher;


    @Override
    public Customer findById(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new CustomerException(CustomerExceptionType.NOT_EXIST_CUSTOMER));
    }

    @Override
    @Transactional
    public void createCustomer(SignupRequest signupRequest) {
        if (isExistCustomerLoginId(signupRequest.getCustomerLoginId())) {
            throw new CustomerException(CustomerExceptionType.DUPLICATE_CUSTOMER_LOGIN_ID);
        }
        customerRepository.save(signupRequest.toEntity(passwordEncoder));
    }

    @Override
    public boolean isExistCustomerLoginId(String customerLoginId) {
        return customerRepository.existsByCustomerLoginId(customerLoginId);
    }

    @Override
    @Transactional
    public void registerMember(RegisterMemberRequest registerMemberRequest, Long customerId) {
        if (!validateRegisterRequest(registerMemberRequest)) {
            throw new CustomerException(CustomerExceptionType.INVALID_REGISTER_FORMAT);
        }
        Customer customer = findById(customerId);
        Optional<Member> memberOptional = memberRepository.findByMemberEmail(registerMemberRequest.getPendingMemberEmail());

        if (memberOptional.isPresent()) {
            // 1. 있으면 => 이미 서비스에 가입되어있는 회원이기에 바로 다대다 테이블에 등록
            memberCustomerRepository.save(MemberCustomer.createMemberCustomer(memberOptional.get(),customer));
            // TODO: 구독 로직
           // alarmService.subscribeCustomer(memberOptional.get().getFcmToken(), customerId);
            eventPublisher.publishEvent(new SubscribeAlarmEvent(memberOptional.get().getFcmToken(), customerId));
        } else {
            // 2. 없으면 => 가입 대기중인 pendingMemberTable에 등록
            pendingMemberRepository.save(PendingMember.createPendingMember(registerMemberRequest,customer));
        }
    }

    @Override
    @Transactional(readOnly = true)
    public MemberDetailResponse getMemberDetail(Long customerId, Long memberId, Boolean isPending) {
        validateMyMember(customerId, memberId);

        if (isPending) {
            PendingMember pendingMember = pendingMemberRepository.findById(memberId)
                    .orElseThrow(() -> new PendingMemberException(PendingMemberExceptionType.NOT_EXIST_PENDING_MEMBER));
            return createPendingMemberDetailResponse(pendingMember);
        } else {
            Member member = memberRepository.findMemberWithPaymentMethodsById(memberId)
                    .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));
            return createMemberDetailResponse(member);
        }
    }

    @Override
    @Transactional
    public void updateMember(Long customerId, Long memberId, MemberRequestWrapper<?> memberRequestWrapper) {
        validateMyMember(customerId, memberId);

        if (memberRequestWrapper.isPending()) {
            PendingMember findMember = pendingMemberRepository.findById(memberId)
                    .orElseThrow(() -> new PendingMemberException(PendingMemberExceptionType.NOT_EXIST_PENDING_MEMBER));

            UpdatePendingMemberRequest updatePendingMemberRequest = objectMapper.convertValue(
                    memberRequestWrapper.getRequest(), UpdatePendingMemberRequest.class);

            findMember.updatePendingMember(updatePendingMemberRequest);
        } else {
            Member findMember = memberRepository.findById(memberId)
                    .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));

            UpdateMemberRequest updateMemberRequest = objectMapper.convertValue(
                    memberRequestWrapper.getRequest(), UpdateMemberRequest.class);

            findMember.updateMember(updateMemberRequest.getMemberName(), updateMemberRequest.getMemberEmail(),updateMemberRequest.getMemberPhone());
            saveOrUpdateAddresses(findMember,updateMemberRequest.getAddresses());
            saveOrDeletePaymentMethods(findMember,updateMemberRequest.getPaymentMethods());
        }
    }

    @Override
    @Transactional
    public void deleteMember(Long customerId, Long memberId, Boolean isPending) {
        validateMyMember(customerId, memberId);

        if (isPending) {
            deletePendingMember(memberId);
        } else {
            deleteRegularMember(memberId,customerId);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Page<MemberListResponse> getMembers(Long customerId, SearchRequest searchRequest, Pageable pageable) {
        List<MemberListResponse> memberListResponses = memberRepository.findMembersByCustomerIdAndSearchRequest(customerId, searchRequest).stream().map(MemberListResponse::new).toList();
        List<MemberListResponse> pendingMemberListResponses = pendingMemberRepository.findPendingMembersByCustomerIdAndSearchRequest(customerId, searchRequest).stream().map(MemberListResponse::new).toList();

        List<MemberListResponse> combinedList = new ArrayList<>();
        combinedList.addAll(memberListResponses);
        combinedList.addAll(pendingMemberListResponses);

        List<Sort.Order> sortOrders = pageable.getSort().get().collect(Collectors.toList());
        if (!sortOrders.isEmpty()) {
            combinedList.sort((m1, m2) -> {
                for (Sort.Order order : sortOrders) {
                    int comparison = compareMembers(m1, m2, order.getProperty());
                    if (comparison != 0) {
                        return order.isAscending() ? comparison : -comparison;
                    }
                }
                return 0;
            });
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), combinedList.size());
        List<MemberListResponse> paginatedList = combinedList.subList(start, end);
        return new PageImpl<>(paginatedList, pageable, combinedList.size());
    }
    private int compareMembers(MemberListResponse m1, MemberListResponse m2, String property) {
        return switch (property) {
            case "memberEmail" -> compareNullable(m1.getMemberEmail(), m2.getMemberEmail());
            case "memberName" -> compareNullable(m1.getMemberName(), m2.getMemberName());
            case "memberPhone" -> compareNullable(m1.getMemberPhone(), m2.getMemberPhone());
            case "createdAt" -> compareNullable(m1.getCreatedAt(), m2.getCreatedAt());
            default -> 0;
        };
    }

    private <T extends Comparable<T>> int compareNullable(T t1, T t2) {
        if (t1 == null && t2 == null) return 0;
        if (t1 == null) return -1;
        if (t2 == null) return 1;
        return t1.compareTo(t2);
    }

    @Override
    public StoreInfoResponse getStoreInfo(Long customerId) {
        Customer customer = findById(customerId);
        return StoreInfoResponse.builder()
                .businessName(customer.getBusinessName())
                .build();
    }

    @Override
    @Transactional
    public void updateCustomerFcmToken(Long customerId, FcmTokenRequest fcmTokenRequest) {
        Customer customer = findById(customerId);
        System.out.println(customer.getFcmToken());
        System.out.println(fcmTokenRequest.getFcmToken());
        if (customer.getFcmToken().equals(fcmTokenRequest.getFcmToken())) {
            return;
        }
        customer.updateCustomerFcmToken(fcmTokenRequest.getFcmToken());
    }

    public boolean validateRegisterRequest(RegisterMemberRequest registerMemberRequest) {
        return !registerMemberRequest.getPendingMemberName().isEmpty() &&
                !registerMemberRequest.getPendingMemberEmail().isEmpty() &&
                !registerMemberRequest.getPendingMemberPhone().isEmpty();
    }

    private MemberDetailResponse createPendingMemberDetailResponse(PendingMember pendingMember) {
        return MemberDetailResponse.builder()
                .memberName(pendingMember.getPendingMemberName())
                .memberEmail(pendingMember.getPendingMemberEmail())
                .memberPhone(pendingMember.getPendingMemberPhone())
                .addresses(new ArrayList<>())
                .paymentMethods(new ArrayList<>())
                .build();
    }

    private MemberDetailResponse createMemberDetailResponse(Member member) {

        List<MemberDetailAddressResponse> addresses = member.getAddresses().stream()
                .map(MemberDetailAddressResponse::new)
                .toList();

        List<MemberPaymentMethodsResponse> paymentMethods = member.getPaymentMethods().stream()
                .map(MemberPaymentMethodsResponse::from)
                .toList();

        return MemberDetailResponse.builder()
                .memberName(member.getMemberName())
                .memberEmail(member.getMemberEmail())
                .memberPhone(member.getMemberPhone())
                .createdAt(member.getCreatedAt())
                .addresses(addresses)
                .paymentMethods(paymentMethods)
                .build();
    }


    @Transactional
    public void saveOrUpdateAddresses(Member member, List<MemberDetailAddressRequest> addressRequests) {
        for (MemberDetailAddressRequest memberDetailAddressRequest : addressRequests) {
            if (memberDetailAddressRequest.getAddressId() == null) {
                Address newAddress = memberDetailAddressRequest.toEntity(member);
                addressRepository.save(newAddress);
            } else if (memberDetailAddressRequest.getAddress() == null) {
                addressRepository.delete(addressRepository.findById(memberDetailAddressRequest.getAddressId()).orElseThrow(() -> new AddressException(AddressExceptionType.NOT_EXIST_ADDRESS)));
            } else {
                Address findAddress = addressRepository.findById(memberDetailAddressRequest.getAddressId())
                        .orElseThrow(() -> new AddressException(AddressExceptionType.NOT_EXIST_ADDRESS));

                findAddress.updateAddress(memberDetailAddressRequest.getAddress());
            }
        }

    }

    @Transactional
    public void saveOrDeletePaymentMethods(Member member, List<MemberDetailPaymentMethodRequest> paymentMethodRequests) {
        for (MemberDetailPaymentMethodRequest memberDetailPaymentMethodRequest : paymentMethodRequests) {
            if (memberDetailPaymentMethodRequest.getBankName() == null && memberDetailPaymentMethodRequest.getCardCompanyName() == null) {
                paymentMethodRepository.deleteById(memberDetailPaymentMethodRequest.getPaymentMethodId());
                continue;
            }

            // paymentMethodId가 없는 경우 (생성)
            if (memberDetailPaymentMethodRequest.getPaymentMethodId() == null) {
                if (memberDetailPaymentMethodRequest.getBankName() == null) {
                    CardPayment newCardPayment = memberDetailPaymentMethodRequest.toCardPaymentEntity(member);
                    cardPaymentRepository.save(newCardPayment);
                } else {
                    AccountPayment newAccountPayment = memberDetailPaymentMethodRequest.toAccountPaymentEntity(member);
                    accountPaymentRepository.save(newAccountPayment);
                }
            }
        }
    }

    private void validateMyMember(Long customerId, Long memberId) {
        if (!memberCustomerRepository.existsByCustomerIdAndMemberId(customerId, memberId) &&
            !pendingMemberRepository.existsByCustomerIdAndPendingMemberId(customerId,memberId)) {
            throw new MemberException(MemberExceptionType.NOT_EXIST_MEMBER);
        }
    }

    private void deletePendingMember(Long memberId) {
        if (!pendingMemberRepository.existsById(memberId)) {
            throw new PendingMemberException(PendingMemberExceptionType.NOT_EXIST_PENDING_MEMBER);
        }
        pendingMemberRepository.deleteById(memberId);
    }

    private void deleteRegularMember(Long memberId, Long customerId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new MemberException(MemberExceptionType.NOT_EXIST_MEMBER));
        memberRepository.deleteById(memberId);
        //TODO
        //alarmService.unsubscribeCustomer(member.getFcmToken(), customerId);
        eventPublisher.publishEvent(new UnSubscribeAlarmEvent(member.getFcmToken(), customerId));
    }

    @Transactional
    @Override
    public void deleteSelectedProducts(List<MemberDeleteRequest> memberDeleteRequestList, Long customerId) {
        for (MemberDeleteRequest memberDeleteRequest : memberDeleteRequestList) {
            deleteMember(customerId,memberDeleteRequest.getId(),memberDeleteRequest.getIsPending());
        }
    }

    @Transactional
    @Override
    public void updateMyPage(MultipartFile image, Long customerId, MyPageUpdateRequest myPageUpdateRequest) {
        Customer findCustomer = findById(customerId);
        String existingImageUrl = findCustomer.getLogoImagePath();

        if (image != null && !image.isEmpty()) {
            // 새로운 이미지가 제공된 경우
            if (existingImageUrl != null) {
                // 기존 이미지가 있다면 삭제
                imageService.deleteImage(existingImageUrl);
            }
            // 새 이미지 업로드
            String newImageUrl = imageService.uploadImage(image);
            findCustomer.saveImage(image.getOriginalFilename(), newImageUrl);
        } else {
            // 새로운 이미지가 제공되지 않은 경우
            // 기존 이미지 유지 (아무 작업도 하지 않음)
        }

        findCustomer.updateCustomer(myPageUpdateRequest);
    }

    @Override
    public MypageDetailResponse getMyPage(Long customerId) {
        Customer customer = findById(customerId);
        return MypageDetailResponse.of(customer);
    }

}
