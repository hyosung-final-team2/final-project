package kr.or.kosa.ubun2_be.domain.customer.service;

import kr.or.kosa.ubun2_be.domain.customer.dto.DailyOrderSummaryRequest;
import kr.or.kosa.ubun2_be.domain.customer.dto.DailyOrderSummaryResponse;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.order.repository.OrderRepository;
import kr.or.kosa.ubun2_be.domain.order.repository.SubscriptionOrderRepository;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final OrderRepository orderRepository;
    private final SubscriptionOrderRepository subscriptionOrderRepository;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

    public List<DailyOrderSummaryResponse> getDailySalesForMonthAndCustomer(DailyOrderSummaryRequest dailyOrderSummaryRequest, Long customerId) {
        LocalDateTime startDate = LocalDateTime.of(dailyOrderSummaryRequest.getYear(), dailyOrderSummaryRequest.getMonth(), 1, 0, 0);
        LocalDateTime endDate = startDate.plusMonths(1).minusNanos(1);

        List<Order> orders = orderRepository.findOrdersByDateRangeAndCustomerId(startDate, endDate, customerId);
        List<SubscriptionOrder> subscriptionOrders = subscriptionOrderRepository.findSubscriptionOrderByDateRangeAndCustomerId(startDate, endDate, customerId);

        Map<LocalDate, List<Order>> singleOrdersByDate = orders.stream()
                .collect(Collectors.groupingBy(order -> order.getCreatedAt().toLocalDate()));
        Map<LocalDate, List<SubscriptionOrder>> subscriptionOrdersByDate = subscriptionOrders.stream()
                .collect(Collectors.groupingBy(subscription -> subscription.getCreatedAt().toLocalDate()));

        Set<LocalDate> allDates = new HashSet<>();
        allDates.addAll(singleOrdersByDate.keySet());
        allDates.addAll(subscriptionOrdersByDate.keySet());

        return allDates.stream()
                .flatMap(date -> {
                    List<Order> singleOrders = singleOrdersByDate.getOrDefault(date, Collections.emptyList());
                    List<SubscriptionOrder> singleSubscriptionOrders = subscriptionOrdersByDate.getOrDefault(date, Collections.emptyList());

                    DailyOrderSummaryResponse singleResponse = DailyOrderSummaryResponse.builder()
                            .title("단건 주문")
                            .count(singleOrders.size())
                            .price(calculateOrderTotalSales(singleOrders))
                            .type(OrderOption.SINGLE.name())
                            .startTime(date.atStartOfDay().format(formatter))
                            .build();

                    DailyOrderSummaryResponse subscriptionResponse = DailyOrderSummaryResponse.builder()
                            .title("정기 주문")
                            .count(singleSubscriptionOrders.size())
                            .price(calculateSubscriptionTotalSales(singleSubscriptionOrders))
                            .type(OrderOption.SUBSCRIPTION.name())
                            .startTime(date.atStartOfDay().format(formatter))
                            .build();

                    return Stream.of(singleResponse, subscriptionResponse);
                })
                .sorted(Comparator.comparing(DailyOrderSummaryResponse::getStartTime))
                .collect(Collectors.toList());
    }

    private long calculateOrderTotalSales(List<Order> orders) {
        return orders.stream()
                .flatMap(order -> order.getOrderProducts().stream())
                .filter(orderProduct -> orderProduct.getOrderProductStatus().equals(OrderProductStatus.APPROVED))
                .mapToLong(orderProduct ->
                        (long) (orderProduct.getPrice() * (1 - orderProduct.getDiscount() / 100.0) * orderProduct.getQuantity()))
                .sum();
    }

    private long calculateSubscriptionTotalSales(List<SubscriptionOrder> subscriptionOrders) {
        return subscriptionOrders.stream()
                .flatMap(subscriptionOrder -> subscriptionOrder.getSubscriptionOrderProducts().stream())
                .filter(orderProduct -> orderProduct.getOrderProductStatus().equals(OrderProductStatus.APPROVED))
                .mapToLong(subscriptionOrderProduct ->
                        (long) (subscriptionOrderProduct.getPrice() * (1 - subscriptionOrderProduct.getDiscount() / 100.0) * subscriptionOrderProduct.getQuantity()))
                .sum();
    }
}