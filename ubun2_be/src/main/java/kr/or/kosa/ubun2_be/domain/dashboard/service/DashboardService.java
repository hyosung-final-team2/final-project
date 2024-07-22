package kr.or.kosa.ubun2_be.domain.dashboard.service;

import kr.or.kosa.ubun2_be.domain.dashboard.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface DashboardService {
    Page<UnifiedOrderResponse> getUnifiedOrdersByDateRangeAndCustomerId(LocalDate startDate, LocalDate endDate, Long customerId, Pageable pageable);
    ProductCountResponseDto getProductCounts(Long customerId);
    MemberCountResponseDto getMemberCounts(Long customerId);
    List<TopSellingProductDto> getTopSellingProducts(Long customerId, LocalDate startDate, LocalDate endDate, long limit);
    List<AddressesResponse> getAddressesByDateRange(Long customerId, LocalDate startDate, LocalDate endDate);
    List<OrderSummaryResponse> getOrderSummary(Long customerId, LocalDate startDate, LocalDate endDate);
    List<OrderCountResponse> getOrderCounts(Long customerId, LocalDate startDate, LocalDate endDate);
}
