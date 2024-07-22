package kr.or.kosa.ubun2_be.domain.dashboard.service.impl;

import kr.or.kosa.ubun2_be.domain.dashboard.dto.*;
import kr.or.kosa.ubun2_be.domain.dashboard.service.DashboardService;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberCustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.repository.PendingMemberRepository;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.OrderProduct;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import kr.or.kosa.ubun2_be.domain.order.repository.OrderRepository;
import kr.or.kosa.ubun2_be.domain.order.repository.SubscriptionOrderRepository;
import kr.or.kosa.ubun2_be.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardServiceImpl implements DashboardService {
    private final OrderRepository orderRepository;
    private final SubscriptionOrderRepository subscriptionOrderRepository;

    private final ProductRepository productRepository;

    private final MemberCustomerRepository memberCustomerRepository;
    private final PendingMemberRepository pendingMemberRepository;
    @Override
    public Page<UnifiedOrderResponse> getUnifiedOrdersByDateRangeAndCustomerId(LocalDate startDate, LocalDate endDate, Long customerId, Pageable pageable) {
        //localdate를 localdatetime으로 변환
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(LocalTime.MAX);

        // 주문 목록 조회
        List<Order> orders = orderRepository.findOrdersByDateRangeAndCustomerId(start,end,customerId);
        List<SubscriptionOrder> subscriptionOrders = subscriptionOrderRepository.findSubscriptionOrderByDateRangeAndCustomerId(start,end,customerId);

        // 주문 목록을 통합
        List<UnifiedOrderResponse> unifiedOrders = new ArrayList<>();
        unifiedOrders.addAll(orders.stream().map(UnifiedOrderResponse::of).collect(Collectors.toList()));
        unifiedOrders.addAll(subscriptionOrders.stream().map(UnifiedOrderResponse::of).collect(Collectors.toList()));

        // 생성일자 기준으로 정렬
        unifiedOrders.sort(Comparator.comparing(UnifiedOrderResponse::getCreatedAt).reversed());

        // 페이지네이션 처리
        int pageStart = (int) pageable.getOffset();
        int pageEnd = Math.min((pageStart + pageable.getPageSize()), unifiedOrders.size());
        return new PageImpl<>(unifiedOrders.subList(pageStart, pageEnd), pageable, unifiedOrders.size());

    }

    @Override
    public ProductCountResponseDto getProductCounts(Long customerId) {
        long totalCount = productRepository.countByCustomerCustomerId(customerId);
        long activeCount = productRepository.countByCustomerCustomerIdAndProductStatus(customerId, true);
        long inactiveCount = productRepository.countByCustomerCustomerIdAndProductStatus(customerId, false);

        return ProductCountResponseDto.of(totalCount, activeCount, inactiveCount);
    }

    @Override
    public MemberCountResponseDto getMemberCounts(Long customerId) {
        long memberCount = memberCustomerRepository.countByCustomerCustomerId(customerId);
        long pendingMemberCount = pendingMemberRepository.countByCustomerCustomerId(customerId);

        return MemberCountResponseDto.of(memberCount, pendingMemberCount);
    }

    @Override
    public List<TopSellingProductDto> getTopSellingProducts(Long customerId, LocalDate startDate, LocalDate endDate, long limit) {
        //localdate를 localdatetime으로 변환
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(LocalTime.MAX);

        // 일반 주문과 구독 주문에서 상위 N개 판매 상품 조회
        List<Object[]> topSellingProducts = orderRepository.findTopSellingProductsByCustomerId(customerId, start, end);
        List<Object[]> topSellingSubscriptionProducts = subscriptionOrderRepository.findTopSellingProductsByCustomerId(customerId, start, end);

        // 일반 주문과 구독 주문 판매 상품을 합침
        List<Object[]> combinedList = new ArrayList<>();
        combinedList.addAll(topSellingProducts);
        combinedList.addAll(topSellingSubscriptionProducts);

        // 제품 ID를 키로 사용하여 판매량을 합산
        Map<Long, TopSellingProductDto> productMap = new HashMap<>();

        for (Object[] productData : combinedList) {

            // 제품 ID, 제품명, 판매량
            Long productId = (Long) productData[0];
            String productName = (String) productData[1];
            Long salesCount = ((Number) productData[2]).longValue();

            productMap.merge(productId,
                    TopSellingProductDto.of(productId, productName, salesCount),
                    (existing, newData) -> TopSellingProductDto.of(
                            existing.getProductId(),
                            existing.getProductName(),
                            existing.getSalesCount() + newData.getSalesCount()
                    )
            );
        }

        // 판매량으로 정렬하고 상위 N개 선택
        return productMap.values().stream()
                .sorted(Comparator.comparingLong(TopSellingProductDto::getSalesCount).reversed())
                .limit(limit)
                .collect(Collectors.toList());
    }

    @Override
    public List<AddressesResponse> getAddressesByDateRange(Long customerId, LocalDate startDate, LocalDate endDate) {
        //localdate를 localdatetime으로 변환
        LocalDateTime start = startDate.atStartOfDay();
        LocalDateTime end = endDate.atTime(LocalTime.MAX);

        // 일반 주문과 구독 주문에서 배송지 조회
        List<AddressesResponse> addresses = orderRepository.findAddressesByDateRange(customerId, start, end).stream()
                .map(AddressesResponse::of)
                .toList();

        List<AddressesResponse> subscriptionAddresses = subscriptionOrderRepository.findAddressesByDateRange(customerId, start, end).stream()
                .map(AddressesResponse::of)
                .toList();

        List<AddressesResponse> combinedList = new ArrayList<>();

        combinedList.addAll(addresses);
        combinedList.addAll(subscriptionAddresses);

        return combinedList;
    }

    @Override
    public List<OrderSummaryResponse> getOrderSummary(Long customerId, LocalDate startDate, LocalDate endDate) {
        List<OrderSummaryResponse> orderSummaries = new ArrayList<>();

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.atTime(LocalTime.MAX);

            List<Order> orders = orderRepository.findOrdersByDateRangeAndCustomerId(start, end, customerId);
            List<SubscriptionOrder> subscriptionOrders = subscriptionOrderRepository.findSubscriptionOrderByDateRangeAndCustomerId(start, end, customerId);

            long orderCount = orders.size();
            long subscriptionOrderCount = subscriptionOrders.size();
            BigDecimal orderRevenue = calculateRevenue(orders);
            BigDecimal subscriptionRevenue = calculateSubscriptionRevenue(subscriptionOrders);

            orderSummaries.add(OrderSummaryResponse.of(
                    date,
                    orderCount,
                    subscriptionOrderCount,
                    orderRevenue,
                    subscriptionRevenue
            ));
        }

        return orderSummaries;
    }

    @Override
    public List<OrderCountResponse> getOrderCounts(Long customerId, LocalDate startDate, LocalDate endDate) {
        List<OrderCountResponse> orderCounts = new ArrayList<>();

        for (LocalDate date = startDate; !date.isAfter(endDate); date = date.plusDays(1)) {
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.atTime(LocalTime.MAX);

            List<Order> orders = orderRepository.findOrdersByDateRangeAndCustomerId(start, end, customerId);
            List<SubscriptionOrder> subscriptionOrders = subscriptionOrderRepository.findSubscriptionOrderByDateRangeAndCustomerId(start, end, customerId);

            long orderCount = orders.size();
            long subscriptionOrderCount = subscriptionOrders.size();

            orderCounts.add(OrderCountResponse.of(orderCount, subscriptionOrderCount, date));
        }

        return orderCounts;
    }


    private BigDecimal calculateRevenue(List<Order> orders) {
        return orders.stream()
                .flatMap(order -> order.getOrderProducts().stream())
                .map(this::calculateProductRevenue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal calculateSubscriptionRevenue(List<SubscriptionOrder> orders) {
        return orders.stream()
                .flatMap(order -> order.getSubscriptionOrderProducts().stream())
                .map(this::calculateSubscriptionProductRevenue)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    private BigDecimal calculateProductRevenue(OrderProduct product) {
        BigDecimal price = BigDecimal.valueOf(product.getPrice());
        BigDecimal quantity = BigDecimal.valueOf(product.getQuantity());
        BigDecimal discount = BigDecimal.valueOf(product.getDiscount()).divide(BigDecimal.valueOf(100));

        return price.multiply(quantity).multiply(BigDecimal.ONE.subtract(discount));
    }

    private BigDecimal calculateSubscriptionProductRevenue(SubscriptionOrderProduct product) {
        BigDecimal price = BigDecimal.valueOf(product.getPrice());
        BigDecimal quantity = BigDecimal.valueOf(product.getQuantity());
        BigDecimal discount = BigDecimal.valueOf(product.getDiscount()).divide(BigDecimal.valueOf(100));

        return price.multiply(quantity).multiply(BigDecimal.ONE.subtract(discount));
    }


}
