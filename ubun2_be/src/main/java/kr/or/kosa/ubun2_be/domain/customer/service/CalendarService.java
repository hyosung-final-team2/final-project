package kr.or.kosa.ubun2_be.domain.customer.service;

import kr.or.kosa.ubun2_be.domain.customer.dto.CalendarRequest;
import kr.or.kosa.ubun2_be.domain.customer.dto.DailyOrderSummaryResponse;
import kr.or.kosa.ubun2_be.domain.customer.dto.request.MonthlySummaryResponse;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.order.repository.OrderRepository;
import kr.or.kosa.ubun2_be.domain.order.repository.SubscriptionOrderRepository;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderOption;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class CalendarService {
    private final OrderRepository orderRepository;
    private final SubscriptionOrderRepository subscriptionOrderRepository;
    private static final DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;

    public List<DailyOrderSummaryResponse> getDailySalesForMonthAndCustomer(CalendarRequest calendarRequest, Long customerId) {
        LocalDateTime startDate = LocalDateTime.of(calendarRequest.getYear(), calendarRequest.getMonth(), 1, 0, 0);
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

    @Transactional
    public MonthlySummaryResponse getMonthlySummary(CalendarRequest calendarRequest, Long customerId) {
        LocalDateTime currentStartDate = LocalDateTime.of(calendarRequest.getYear(), calendarRequest.getMonth(), 1, 0, 0);

        LocalDateTime currentEndDate = LocalDateTime.now().getMonth() == currentStartDate.getMonth() && LocalDateTime.now().getYear() == currentStartDate.getYear() ?
                LocalDateTime.now() : currentStartDate.plusMonths(1).minusNanos(1);
        MonthlySummaryResponse.MonthStatistics currentMonth = calculateMonthlySummary(currentStartDate, currentEndDate, customerId);

        LocalDateTime previousStartDate = currentStartDate.minusMonths(1);
        LocalDateTime previousEndDate = previousStartDate.plusMonths(1).minusNanos(1);
        MonthlySummaryResponse.MonthStatistics previousMonth = calculateMonthlySummary(previousStartDate, previousEndDate, customerId);

        return MonthlySummaryResponse.builder()
                .currentMonth(currentMonth)
                .previousMonth(previousMonth)
                .build();

    }

    private MonthlySummaryResponse.MonthStatistics calculateMonthlySummary(LocalDateTime startDate, LocalDateTime endDate, Long customerId) {
        long totalDays = ChronoUnit.DAYS.between(startDate, endDate) + 1;

        long monthOrderCount = orderRepository.countOrdersByCustomerAndDateRange(startDate, endDate, customerId);
        long monthSubscriptionOrderCount = subscriptionOrderRepository.countSubscriptionOrdersByCustomerAndDateRange(startDate, endDate, customerId);
        long monthTotalOrderCount = monthOrderCount + monthSubscriptionOrderCount;

        long monthOrderTotalSales = orderRepository.sumOrderTotalByCustomerAndDateRange(startDate, endDate, customerId);
        long monthSubscriptionOrderTotalSales = subscriptionOrderRepository.sumSubscriptionOrderTotalByCustomerAndDateRange(startDate, endDate, customerId);
        long monthTotalSales = monthOrderTotalSales + monthSubscriptionOrderTotalSales;

        return MonthlySummaryResponse.MonthStatistics.builder()
                .monthOrderCount(monthOrderCount)
                .monthSubscriptionOrderCount(monthSubscriptionOrderCount)
                .monthTotalOrderCount(monthTotalOrderCount)
                .monthOrderTotalSales(monthOrderTotalSales)
                .monthSubscriptionOrderTotalSales(monthSubscriptionOrderTotalSales)
                .monthTotalSales(monthTotalSales)
                .monthAverageDailySales(monthTotalSales / totalDays)
                .monthAverageDailyOrderCount(monthTotalOrderCount / totalDays)
                .build();

    }

}