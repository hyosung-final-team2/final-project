package kr.or.kosa.ubun2_be.domain.order.service.impl;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import kr.or.kosa.ubun2_be.domain.cart.entity.Cart;
import kr.or.kosa.ubun2_be.domain.cart.repository.CartProductRepository;
import kr.or.kosa.ubun2_be.domain.cart.service.CartService;
import kr.or.kosa.ubun2_be.domain.financial.institution.entity.Bank;
import kr.or.kosa.ubun2_be.domain.financial.institution.service.BankService;
import kr.or.kosa.ubun2_be.domain.financial.institution.service.CardCompanyService;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.service.MemberService;
import kr.or.kosa.ubun2_be.domain.order.dto.*;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.OrderProduct;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import kr.or.kosa.ubun2_be.domain.alarm.event.OrderCreatedEvent;
import kr.or.kosa.ubun2_be.domain.order.exception.OrderException;
import kr.or.kosa.ubun2_be.domain.order.exception.OrderExceptionType;
import kr.or.kosa.ubun2_be.domain.order.repository.OrderProductRepository;
import kr.or.kosa.ubun2_be.domain.order.repository.OrderRepository;
import kr.or.kosa.ubun2_be.domain.order.repository.SubscriptionOrderRepository;
import kr.or.kosa.ubun2_be.domain.order.service.OrderService;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.AccountPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.CardPayment;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodException;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodExceptionType;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.AccountPaymentRepository;
import kr.or.kosa.ubun2_be.domain.paymentmethod.repository.CardPaymentRepository;
import kr.or.kosa.ubun2_be.domain.paymentmethod.service.PaymentMethodService;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductException;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductExceptionType;
import kr.or.kosa.ubun2_be.domain.product.service.ProductService;
import kr.or.kosa.ubun2_be.domain.product.service.impl.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final SubscriptionOrderRepository subscriptionOrderRepository;
    private final MemberService memberService;
    private final ProductService productService;
    private final PaymentMethodService paymentMethodService;
    private final InventoryService inventoryService;
    private final CardCompanyService cardCompanyService;
    private final BankService bankService;
    private final CartProductRepository cartProductRepository;
    private final AddressService addressService;
    private final OrderProductRepository orderProductRepository;
    private final CartService cartService;
    private final CardPaymentRepository cardPaymentRepository;
    private final AccountPaymentRepository accountPaymentRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Override
    @Transactional(readOnly = true)
    public Page<UnifiedOrderResponse> getOrders(Long customerId, SearchRequest searchRequest, Pageable pageable) {
        List<UnifiedOrderResponse> orderResponseLists = orderRepository.findOrdersByCustomerIdAndSearchRequest(customerId, searchRequest).stream().map(UnifiedOrderResponse::new).toList();
        List<UnifiedOrderResponse> subscriptionOrderResponseList = subscriptionOrderRepository.findSubscriptionOrdersByCustomerIdAndSearchRequest(customerId, searchRequest).stream().map(UnifiedOrderResponse::new).toList();

        List<UnifiedOrderResponse> combinedList = new ArrayList<>();
        combinedList.addAll(orderResponseLists);
        combinedList.addAll(subscriptionOrderResponseList);

        // totalCost 필터링
        if (searchRequest != null && "totalCost".equals(searchRequest.getSearchCategory())) {
            String[] range = searchRequest.getSearchKeyword().split(",");
            if (range.length == 2) {
                long start = Long.parseLong(range[0].trim());
                long end = Long.parseLong(range[1].trim());
                combinedList = combinedList.stream()
                        .filter(order -> order.getTotalOrderPrice() >= start && order.getTotalOrderPrice() <= end)
                        .collect(Collectors.toList());
            }
        }

        // isSubscription 필터링
        if (searchRequest != null && "isSubscription".equals(searchRequest.getSearchCategory())) {
            boolean isSubscription = Boolean.parseBoolean(searchRequest.getSearchKeyword());
            combinedList = combinedList.stream()
                    .filter(order -> order.isSubscription() == isSubscription)
                    .collect(Collectors.toList());
        }

        List<Sort.Order> sortOrders = pageable.getSort().get().collect(Collectors.toList());
        if (!sortOrders.isEmpty()) {
            combinedList.sort((m1, m2) -> {
                for (Sort.Order order : sortOrders) {
                    int comparison = compareOrders(m1, m2, order.getProperty());
                    if (comparison != 0) {
                        return order.isAscending() ? comparison : -comparison;
                    }
                }
                return 0;
            });
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), combinedList.size());
        List<UnifiedOrderResponse> paginatedList = combinedList.subList(start, end);
        return new PageImpl<>(paginatedList, pageable, combinedList.size());
    }

    private int compareOrders(UnifiedOrderResponse o1, UnifiedOrderResponse o2, String property) {
        return switch (property) {
            case "totalCost" -> compareNullable(o1.getTotalOrderPrice(), o2.getTotalOrderPrice());
            case "createdAt" -> compareNullable(o1.getCreatedAt(), o2.getCreatedAt());
            case "memberName" -> compareNullable(o1.getMemberName(), o2.getMemberName());
            case "orderStatus" ->
                    compareNullable(OrderStatus.valueOf(o1.getOrderStatus()).getName(), OrderStatus.valueOf(o2.getOrderStatus()).getName());
            case "paymentType" -> compareNullable(o1.getPaymentType(), o2.getPaymentType());
            case "isSubscription" -> Boolean.compare(o1.isSubscription(), o2.isSubscription());
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
    public OrderDetailResponse getOrderByCustomerIdAndOrderId(Long orderId, Long customerId) {
        Order findOrder = orderRepository.findOrderByIdAndCustomerId(orderId, customerId)
                .orElseThrow(() -> new OrderException(OrderExceptionType.NOT_EXIST_ORDER));

        return createOrderDetailResponseWithPayment(findOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<UnifiedOrderResponse> getPendingOrders(Long customerId, SearchRequest searchRequest, Pageable pageable) {
        List<UnifiedOrderResponse> orderResponseLists = orderRepository.findPendingOrdersByCustomerIdAndSearchRequest(customerId, searchRequest).stream().map(UnifiedOrderResponse::new).toList();
        List<UnifiedOrderResponse> subscriptionOrderResponseList = subscriptionOrderRepository.findPendingSubscriptionOrdersByCustomerIdAndSearchRequest(customerId, searchRequest).stream().map(UnifiedOrderResponse::new).toList();

        List<UnifiedOrderResponse> combinedList = new ArrayList<>();
        combinedList.addAll(orderResponseLists);
        combinedList.addAll(subscriptionOrderResponseList);

        // totalCost 필터링
        if (searchRequest != null && "totalCost".equals(searchRequest.getSearchCategory())) {
            String[] range = searchRequest.getSearchKeyword().split(",");
            if (range.length == 2) {
                long start = Long.parseLong(range[0].trim());
                long end = Long.parseLong(range[1].trim());
                combinedList = combinedList.stream()
                        .filter(order -> order.getTotalOrderPrice() >= start && order.getTotalOrderPrice() <= end)
                        .collect(Collectors.toList());
            }
        }

        // isSubscription 필터링
        if (searchRequest != null && "isSubscription".equals(searchRequest.getSearchCategory())) {
            boolean isSubscription = Boolean.parseBoolean(searchRequest.getSearchKeyword());
            combinedList = combinedList.stream()
                    .filter(order -> order.isSubscription() == isSubscription)
                    .collect(Collectors.toList());
        }

        List<Sort.Order> sortOrders = pageable.getSort().get().collect(Collectors.toList());
        if (!sortOrders.isEmpty()) {
            combinedList.sort((m1, m2) -> {
                for (Sort.Order order : sortOrders) {
                    int comparison = compareOrders(m1, m2, order.getProperty());
                    if (comparison != 0) {
                        return order.isAscending() ? comparison : -comparison;
                    }
                }
                return 0;
            });
        }

        int start = (int) pageable.getOffset();
        int end = Math.min((start + pageable.getPageSize()), combinedList.size());
        List<UnifiedOrderResponse> paginatedList = combinedList.subList(start, end);

        return new PageImpl<>(paginatedList, pageable, combinedList.size());
    }

    @Override
    @Transactional
    public void updateOrderStatus(Long customerId, List<OrderApproveRequest> orderApproveRequests) {
        for (OrderApproveRequest request : orderApproveRequests) {
            // 1. PENDING 상태인 주문 조회
            Order findPendingOrder = orderRepository.findPendingOrderByIdAndCustomerId(request.getOrderId(), customerId)
                    .orElseThrow(() -> new OrderException(OrderExceptionType.NOT_EXIST_ORDER));

            // 2. 새로운 주문 상태 검증 & 설정
            OrderStatus newStatus = validateAndGetOrderStatus(request.getOrderStatus());
            findPendingOrder.changeOrderStatus(newStatus);

            // 3. 주문 상품 상태 변경
            for (OrderProduct orderProduct : findPendingOrder.getOrderProducts()) {
                if (newStatus.equals(OrderStatus.APPROVED)) {
                    orderProduct.changeOrderProductStatus(OrderProductStatus.APPROVED);
                } else {
                    orderProduct.changeOrderProductStatus(OrderProductStatus.DENIED);
                }
            }

            // 4. 주문 상태가 DENIED 인 경우 재고 복구
            if (newStatus.equals(OrderStatus.DENIED)) {
                restoreInventory(findPendingOrder.getOrderProducts());
            }
            orderRepository.save(findPendingOrder);
        }
    }

    @Override
    @Transactional
    public void updateSubscriptionOrderStatus(Long customerId, List<SubscriptionApproveRequest> subscriptionApproveRequests) {
        for (SubscriptionApproveRequest request : subscriptionApproveRequests) {
            // 1. PENDING 상태인 주문 조회
            SubscriptionOrder findSubscriptionPendingOrder = subscriptionOrderRepository
                    .findPendingSubscriptionOrderByIdAndCustomerId(request.getSubscriptionOrderId(), customerId)
                    .orElseThrow(() -> new OrderException(OrderExceptionType.NOT_EXIST_ORDER));

            // 2. 새로운 주문 상태 검증 & 설정
            OrderStatus newOrderStatus = validateAndGetOrderStatus(request.getOrderStatus());
            findSubscriptionPendingOrder.changeOrderStatus(newOrderStatus);

            // 3. 주문 상품 상태 변경
            for (SubscriptionOrderProduct subscriptionOrderProduct : findSubscriptionPendingOrder.getSubscriptionOrderProducts()) {
                if (newOrderStatus.equals(OrderStatus.APPROVED)) {
                    subscriptionOrderProduct.changeSubscriptionOrderProductStatus(OrderProductStatus.APPROVED);
                } else {
                    subscriptionOrderProduct.changeSubscriptionOrderProductStatus(OrderProductStatus.DENIED);
                }
            }

            if (newOrderStatus.equals(OrderStatus.DENIED)) {
                restoreInventoryForSubscription(findSubscriptionPendingOrder.getSubscriptionOrderProducts());
            }
            subscriptionOrderRepository.save(findSubscriptionPendingOrder);
        }
    }

    private OrderStatus validateAndGetOrderStatus(String orderStatus) {
        try {
            return OrderStatus.valueOf(orderStatus.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new OrderException(OrderExceptionType.INVALID_ORDER_STATUS);
        }
    }

    // 회원의 주문 유효성 검사
    @Override
    @Transactional
    public void validateAndPrepareOrder(Long memberId, SubscriptionOrderRequest orderRequest) {
        // 1. 회원 및 결제 수단 확인
        Member member = memberService.findById(memberId);
        PaymentMethod paymentMethod = paymentMethodService.findById(orderRequest.getPaymentMethodId());

        // 2. 상품에 대한 고객 확인
        validateCustomerProduct(orderRequest);

        // 3. 재고 확인
        checkInventoryForOrder(orderRequest);

        // 4. 결제 확인
        checkPayment(orderRequest, paymentMethod, member.getMemberName());
    }

    // 단건 주문 생성
    @Override
    @Transactional
    public void createSingleOrder(Long memberId, SubscriptionOrderRequest orderRequest) {
        // 1. 주문 생성 전 유효성 검사
        validateAndPrepareOrder(memberId, orderRequest);

        // 2. 주문 생성
        Order order = createOrder(paymentMethodService.findById(orderRequest.getPaymentMethodId()), memberService.findById(memberId), orderRequest);

        // 3. 재고 감소
        decreaseInventory(order.getOrderProducts());

        // 4. 장바구니 상품 삭제
        deleteCartProducts(memberId, orderRequest.getSubscriptionOrderProducts());

        // 5. 고객에게 push notification (단건주문)
        eventPublisher.publishEvent(new OrderCreatedEvent(orderRequest));
    }

    private void validateCustomerProduct(SubscriptionOrderRequest orderRequest) {
        for (SubscriptionOrderProductRequest productRequest : orderRequest.getSubscriptionOrderProducts()) {
            productService.getProductByCustomerIdAndProductId(orderRequest.getCustomerId(), productRequest.getProductId(), false);
        }
    }

    private void checkInventoryForOrder(SubscriptionOrderRequest request) {
        for (SubscriptionOrderProductRequest product : request.getSubscriptionOrderProducts()) {
            int stock = inventoryService.getStock(product.getProductId());
            if (stock < product.getQuantity()) {
                throw new ProductException(ProductExceptionType.INSUFFICIENT_STOCK, List.of(product.getProductId()));
            }
        }
    }

    private void checkPayment(SubscriptionOrderRequest orderRequest, PaymentMethod paymentMethod, String memberName) {
        String paymentType = paymentMethod.getPaymentType();


        if (!orderRequest.getPaymentType().equals(paymentType) || !Objects.equals(paymentMethod.getMember().getMemberName(), memberName)) {
            throw new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD);
        }
        long totalCost = calculateTotalCost(orderRequest);

        switch (paymentType) {
            case "ACCOUNT":
                withdrawTotalPrice(paymentMethod, memberName, totalCost);
                break;
            case "CARD":
                checkCardValidity(paymentMethod, memberName);
                break;
            default:
                throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_PAYMENT_TYPE);
        }
    }

    private long calculateTotalCost(SubscriptionOrderRequest orderRequest) {
        return orderRequest.getSubscriptionOrderProducts().stream()
                .mapToLong(product -> (long) (product.getPrice() * (1 - product.getDiscount() / 100.0) * product.getQuantity()))
                .sum();
    }

    private void checkCardValidity(PaymentMethod paymentMethod, String memberName) {
        cardCompanyService.checkCardPayment(paymentMethod, memberName);
    }

    private void withdrawTotalPrice(PaymentMethod paymentMethod, String memberName, long totalPrice) {
        Bank account = bankService.getAccount(paymentMethod, memberName);
        long currentBalance = account.getBalance();
        long newBalance = currentBalance - totalPrice;

        if (newBalance < 0) {
            throw new PaymentMethodException(PaymentMethodExceptionType.INSUFFICIENT_ACCOUNT_BALANCE);
        }
        account.changeBalance(newBalance);
    }

    private void decreaseInventory(List<OrderProduct> orderProducts) {
        for (OrderProduct orderProduct : orderProducts) {
            boolean decreased = inventoryService.decreaseStock(
                    orderProduct.getProduct().getProductId(),
                    orderProduct.getQuantity()
            );
            if (!decreased) {
                throw new ProductException(ProductExceptionType.INVENTORY_UPDATE_FAILED);
            }
        }
    }

    private void deleteCartProducts(Long memberId, List<SubscriptionOrderProductRequest> products) {
        List<Long> productIds = products.stream()
                .map(SubscriptionOrderProductRequest::getProductId)
                .collect(Collectors.toList());
        cartProductRepository.deleteByCart_Member_MemberIdAndProductProductIdIn(memberId, productIds);
    }

    private Order createOrder(PaymentMethod paymentMethod, Member member, SubscriptionOrderRequest request) {
        Address address = addressService.findByAddressIdAndMemberId(request.getAddressId(), member.getMemberId());
        Cart cart = cartService.findByMemberIdAndCustomerId(member.getMemberId(), request.getCustomerId()); // Cart 객체를 가져오는 로직 추가

        Order order = Order.builder()
                .member(member)
                .paymentMethod(paymentMethod)
                .address(address)
                .cart(cart)
                .orderStatus(OrderStatus.PENDING)
                .build();

        Order savedOrder = orderRepository.save(order);

        List<OrderProduct> orderProducts = request.getSubscriptionOrderProducts().stream()
                .map(p -> {
                    Product product = productService.getProductById(p.getProductId());
                    return OrderProduct.builder()
                            .order(savedOrder)
                            .price(p.getPrice())
                            .quantity(p.getQuantity())
                            .product(product)
                            .orderProductStatus(OrderProductStatus.PENDING)
                            .discount(p.getDiscount())
                            .build();
                })
                .collect(Collectors.toList());

        List<OrderProduct> savedOrderProducts = orderProductRepository.saveAll(orderProducts);

        savedOrder.createOrderProducts(savedOrderProducts);

        return savedOrder;
    }

    @Override
    public Page<UnifiedOrderResponse> getAllSingleOrdersByMemberId(OrderPeriodFilterRequest orderPeriodFilterRequest, Long memberId, Pageable pageable) {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = getStartDate(orderPeriodFilterRequest, endDate);

        Page<Order> orders = orderRepository.findOrdersByMemberId(memberId, startDate, endDate, pageable);

        return orders.map(UnifiedOrderResponse::new);
    }

    public OrderStatusSummaryResponse getOrderStatusSummaryByMemberId(Long memberId) {
        List<Order> singleOrders = orderRepository.findByMemberId(memberId);
        List<SubscriptionOrder> subscriptionOrders = subscriptionOrderRepository.findByMemberId(memberId);

        int pendingCount = 0;
        int deniedCount = 0;
        int approvedCount = 0;

        for (Order order : singleOrders) {
            if (order.getOrderStatus() == OrderStatus.PENDING) {
                pendingCount++;
            } else if (order.getOrderStatus() == OrderStatus.DENIED) {
                deniedCount++;
            } else if (order.getOrderStatus() == OrderStatus.APPROVED) {
                approvedCount++;
            }
        }

        for (SubscriptionOrder subscriptionOrder : subscriptionOrders) {
            if (subscriptionOrder.getOrderStatus() == OrderStatus.PENDING) {
                pendingCount++;
            } else if (subscriptionOrder.getOrderStatus() == OrderStatus.DENIED) {
                deniedCount++;
            } else if (subscriptionOrder.getOrderStatus() == OrderStatus.APPROVED) {
                approvedCount++;
            }
        }

        return OrderStatusSummaryResponse.builder()
                .pending(pendingCount)
                .denied(deniedCount)
                .approved(approvedCount)
                .singleOrders(singleOrders.size())
                .subscriptionOrders(subscriptionOrders.size())
                .build();
    }

    private LocalDateTime getStartDate(OrderPeriodFilterRequest orderPeriodFilterRequest, LocalDateTime endDate) {
        if (orderPeriodFilterRequest.getPeriodType() == null || orderPeriodFilterRequest.getPeriodValue() <= 0) {
            return LocalDateTime.MIN;
        }
        return switch (orderPeriodFilterRequest.getPeriodType()) {
            case WEEK -> endDate.minusWeeks(orderPeriodFilterRequest.getPeriodValue());
            case MONTH -> endDate.minusMonths(orderPeriodFilterRequest.getPeriodValue());
            default -> throw new OrderException(OrderExceptionType.NOT_MATCH_PERIOD_TYPE);
        };
    }

    @Override
    public OrderDetailResponse getOrderByMemberIdAndOrderId(Long memberId, Long orderId) {
        Order findOrder = orderRepository.findByOrderIdAndMemberMemberId(orderId, memberId)
                .orElseThrow(() -> new OrderException(OrderExceptionType.NOT_EXIST_ORDER));

        return createOrderDetailResponseWithPayment(findOrder);
    }

    @Override
    @Transactional
    public void cancelOrder(Long memberId, CancelOrderRequest cancelOrderRequest) {
        memberService.isExistMemberCustomer(memberId, cancelOrderRequest.getCustomerId());

        Order order = orderRepository.findByOrderIdAndMemberMemberIdAndOrderStatus(cancelOrderRequest.getOrderId(), memberId, OrderStatus.PENDING)
                .orElseThrow(() -> new OrderException(OrderExceptionType.NOT_EXIST_ORDER));

        order.changeOrderStatus(OrderStatus.DENIED);

        for (OrderProduct orderProduct : order.getOrderProducts()) {
            orderProduct.changeOrderProductStatus(OrderProductStatus.REJECTED);
        }

        restoreInventory(order.getOrderProducts());
        orderRepository.save(order);
    }

    private void restoreInventory(List<OrderProduct> orderProducts) {
        for (OrderProduct orderProduct : orderProducts) {
            inventoryService.increaseStock(orderProduct.getProduct().getProductId(), orderProduct.getQuantity());
        }
    }

    private void restoreInventoryForSubscription(List<SubscriptionOrderProduct> subscriptionOrderProducts) {
        for (SubscriptionOrderProduct subscriptionOrderProduct : subscriptionOrderProducts) {
            inventoryService.increaseStock(subscriptionOrderProduct.getProduct().getProductId(), subscriptionOrderProduct.getQuantity());
        }
    }

    private OrderDetailResponse createOrderDetailResponseWithPayment(Order findOrder) {
        Long paymentMethodId = findOrder.getPaymentMethod().getPaymentMethodId();
        String paymentMethodType = findOrder.getPaymentMethod().getPaymentType();

        switch (paymentMethodType) {
            case "CARD" -> {
                CardPayment cardPayment = cardPaymentRepository.findByPaymentMethodId(paymentMethodId)
                        .orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD));
                return new OrderDetailResponse(findOrder, cardPayment);
            }
            case "ACCOUNT" -> {
                AccountPayment accountPayment = accountPaymentRepository.findByPaymentMethodId(paymentMethodId)
                        .orElseThrow(() -> new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD));
                return new OrderDetailResponse(findOrder, accountPayment);
            }
            default -> throw new PaymentMethodException(PaymentMethodExceptionType.INVALID_PAYMENT_TYPE);
        }
    }
}