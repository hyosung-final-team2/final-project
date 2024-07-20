package kr.or.kosa.ubun2_be.domain.order.service.impl;//package kr.or.kosa.ubun2_be.domain.order.service.impl;

import jakarta.transaction.Transactional;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.address.service.AddressService;
import kr.or.kosa.ubun2_be.domain.cart.repository.CartProductRepository;
import kr.or.kosa.ubun2_be.domain.financial.institution.entity.Bank;
import kr.or.kosa.ubun2_be.domain.financial.institution.service.BankService;
import kr.or.kosa.ubun2_be.domain.financial.institution.service.CardCompanyService;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.service.MemberService;
import kr.or.kosa.ubun2_be.domain.order.dto.RemoveSubscriptionOrderProductRequest;
import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderDetailResponse;
import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderProductRequest;
import kr.or.kosa.ubun2_be.domain.order.dto.SubscriptionOrderRequest;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrderProduct;
import kr.or.kosa.ubun2_be.domain.order.repository.SubscriptionOrderProductRepository;
import kr.or.kosa.ubun2_be.domain.order.repository.SubscriptionOrderRepository;
import kr.or.kosa.ubun2_be.domain.order.service.SubscriptionOrderService;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodException;
import kr.or.kosa.ubun2_be.domain.paymentmethod.exception.paymentMethod.PaymentMethodExceptionType;
import kr.or.kosa.ubun2_be.domain.paymentmethod.service.PaymentMethodService;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderProductStatus;
import kr.or.kosa.ubun2_be.domain.product.enums.OrderStatus;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductException;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductExceptionType;
import kr.or.kosa.ubun2_be.domain.product.service.ProductService;
import kr.or.kosa.ubun2_be.domain.product.service.impl.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SubscriptionOrderServiceImpl implements SubscriptionOrderService {
    private final SubscriptionOrderRepository subscriptionOrderRepository;
    private final SubscriptionOrderProductRepository subscriptionOrderProductRepository;
    private final ProductService productService;
    private final InventoryService inventoryService;
    private final MemberService memberService;
    private final PaymentMethodService paymentMethodService;
    private final CartProductRepository cartProductRepository;
    private final BankService bankService;
    private final AddressService addressService;
    private final CardCompanyService cardCompanyService;

    @Override
    @Transactional
    public void createSubscriptionOrders(Long memberId, List<SubscriptionOrderRequest> subscriptionOrderRequests) {

        Member member = memberService.findById(memberId);
        PaymentMethod paymentMethod = paymentMethodService.findById(subscriptionOrderRequests.get(0).getPaymentMethodId());

        //1. 모든 상품에 대한 customer 체크
        validateAllCustomerProducts(subscriptionOrderRequests);

        // 2. 전체 재고 확인
        checkInventoryForAllOrders(subscriptionOrderRequests);

        //3. payment 확인
        checkPayment(subscriptionOrderRequests, paymentMethod, member.getMemberName());

        for (SubscriptionOrderRequest request : subscriptionOrderRequests) {
            // 4. 주문 생성
            SubscriptionOrder subscriptionOrder = createSubscriptionOrder(paymentMethod, member, request);

            // 5. 재고 감소
            decreaseInventory(subscriptionOrder.getSubscriptionOrderProducts());

            // 6. cartProduct 삭제
            deleteCartProducts(memberId, request.getSubscriptionOrderProducts());
        }
    }

    public void validateAllCustomerProducts(List<SubscriptionOrderRequest> requests) {
        for (SubscriptionOrderRequest request : requests) {
            Long customerId = request.getCustomerId();
            for (SubscriptionOrderProductRequest productRequest : request.getSubscriptionOrderProducts()) {
                Long productId = productRequest.getProductId();
                productService.getProductByCustomerIdAndProductId(customerId, productId, false);
            }
        }
    }

    private void checkInventoryForAllOrders(List<SubscriptionOrderRequest> requests) {
        List<SubscriptionOrderProductRequest> allProducts = requests.stream()
                .flatMap(request -> request.getSubscriptionOrderProducts().stream())
                .toList();

        List<Long> insufficientStockProducts = allProducts.stream()
                .filter(product -> {
                    int stock = inventoryService.getStock(product.getProductId());
                    return stock < product.getQuantity();
                })
                .map(SubscriptionOrderProductRequest::getProductId)
                .collect(Collectors.toList());

        if (!insufficientStockProducts.isEmpty()) {
            throw new ProductException(ProductExceptionType.INSUFFICIENT_STOCK, insufficientStockProducts);
        }
    }

    private void checkPayment(List<SubscriptionOrderRequest> subscriptionOrderRequests, PaymentMethod paymentMethod, String memberName) {
        String paymentType = paymentMethod.getPaymentType();
        if (!subscriptionOrderRequests.get(0).getPaymentType().equals(paymentType) || !Objects.equals(paymentMethod.getMember().getMemberName(), memberName)) {
            throw new PaymentMethodException(PaymentMethodExceptionType.NOT_EXIST_PAYMENT_METHOD); //올바르지 않은 결제수단 예외
        }
        long totalCost = calculateTotalCostForAllOrders(subscriptionOrderRequests);

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

    private long calculateTotalCostForAllOrders(List<SubscriptionOrderRequest> requests) {
        return requests.stream()
                .flatMap(request -> request.getSubscriptionOrderProducts().stream())
                .mapToLong(p -> (long) (p.getPrice() * (1 - p.getDiscount() / 100.0) * p.getQuantity()))
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

    private void decreaseInventory(List<SubscriptionOrderProduct> subscriptionOrderProducts) {
        for (SubscriptionOrderProduct orderProduct : subscriptionOrderProducts) {
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

    private SubscriptionOrder createSubscriptionOrder(PaymentMethod paymentMethod, Member member, SubscriptionOrderRequest request) {
        Address address = addressService.findByAddressIdAndMemberId(request.getAddressId(), member.getMemberId());

        SubscriptionOrder subscriptionOrder = SubscriptionOrder.builder()
                .member(member)
                .paymentMethod(paymentMethod)
                .address(address)
                .orderStatus(OrderStatus.PENDING)
                .intervalDays(request.getIntervalDays())
                .nextOrderDate(LocalDateTime.now().plusDays(request.getIntervalDays()))
                .build();

        SubscriptionOrder savedSubscriptionOrder = subscriptionOrderRepository.save(subscriptionOrder);

        List<SubscriptionOrderProduct> orderProducts = request.getSubscriptionOrderProducts().stream()
                .map(p -> {
                    Product product = productService.getProductById(p.getProductId());
                    return SubscriptionOrderProduct.builder()
                            .subscriptionOrder(savedSubscriptionOrder)
                            .cycleNumber(1)
                            .price(p.getPrice())
                            .quantity(p.getQuantity())
                            .product(product)
                            .orderProductStatus(OrderProductStatus.PENDING)
                            .discount(p.getDiscount())
                            .build();
                })
                .collect(Collectors.toList());

        List<SubscriptionOrderProduct> savedSubscriptionOrderProducts = subscriptionOrderProductRepository.saveAll(orderProducts);

        savedSubscriptionOrder.createSubscriptionOrderProducts(savedSubscriptionOrderProducts);

        return savedSubscriptionOrder;
    }

    @Scheduled(cron = "0 0 0 * * *") // 매일 자정에 실행
    @Transactional
    public void processApprovedSubscriptionOrders() {
        LocalDateTime today = LocalDateTime.now().withHour(0).withMinute(0).withSecond(0).withNano(0);
        List<SubscriptionOrder> approvedOrders = subscriptionOrderRepository.findByNextOrderDateAndOrderStatus(today, OrderStatus.APPROVED);

        for (SubscriptionOrder order : approvedOrders) {
            processSubscriptionOrder(order);
        }
    }

    private void processSubscriptionOrder(SubscriptionOrder subscriptionOrder) {
        PaymentMethod paymentMethod = subscriptionOrder.getPaymentMethod();
        Member member = subscriptionOrder.getMember();
        List<SubscriptionOrderProduct> previousCycleProducts = getPreviousCycleApprovedProducts(subscriptionOrder);

        if (previousCycleProducts.isEmpty()) {
            subscriptionOrder.changeOrderStatus(OrderStatus.DENIED);
            subscriptionOrderRepository.save(subscriptionOrder);
            return;
        }
        try {
            checkInventory(previousCycleProducts);
            checkPayment(subscriptionOrder, paymentMethod, member.getMemberName());
            decreaseInventory(previousCycleProducts);
            List<SubscriptionOrderProduct> nextProducts = createNextCycleProducts(subscriptionOrder, previousCycleProducts);
            updateOrderWithNewProducts(subscriptionOrder, nextProducts);

        } catch (Exception e) {
            subscriptionOrder.changeOrderStatus(OrderStatus.DELAY); //정기주문 N회차 생성불가 -> Delay status
        }
        subscriptionOrderRepository.save(subscriptionOrder);//        명시적 save

    }

    private void checkInventory(List<SubscriptionOrderProduct> products) {
        for (SubscriptionOrderProduct product : products) {
            int availableStock = inventoryService.getStock(product.getProduct().getProductId());
            if (availableStock < product.getQuantity()) {
                throw new ProductException(ProductExceptionType.INSUFFICIENT_STOCK);
            }
        }
    }

    private void checkPayment(SubscriptionOrder subscriptionOrder, PaymentMethod paymentMethod, String memberName) {
        String paymentType = paymentMethod.getPaymentType();
        long totalCost = calculateTotalCostForOrder(subscriptionOrder);

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

    private long calculateTotalCostForOrder(SubscriptionOrder order) {
        return order.getSubscriptionOrderProducts().stream()
                .mapToLong(p -> (long) (p.getPrice() * (1 - p.getDiscount() / 100.0) * p.getQuantity()))
                .sum();
    }

    private void updateOrderWithNewProducts(SubscriptionOrder order, List<SubscriptionOrderProduct> newProducts) {
        order.addSubscriptionOrderProducts(newProducts);
        subscriptionOrderProductRepository.saveAll(newProducts);
        order.changeNextOrderDate();
        order.changeOrderStatus(OrderStatus.APPROVED);
    }

    private List<SubscriptionOrderProduct> createNextCycleProducts(SubscriptionOrder order, List<SubscriptionOrderProduct> previousProducts) {
        return previousProducts.stream()
                .map(prevProduct -> createNextCycleProduct(order, prevProduct))
                .collect(Collectors.toList());
    }

    private SubscriptionOrderProduct createNextCycleProduct(SubscriptionOrder order, SubscriptionOrderProduct previousProduct) {
        return SubscriptionOrderProduct.builder()
                .subscriptionOrder(order)
                .product(previousProduct.getProduct())
                .quantity(previousProduct.getQuantity())
                .price(previousProduct.getPrice())
                .discount(previousProduct.getDiscount())
                .cycleNumber(previousProduct.getCycleNumber() + 1)
                .orderProductStatus(OrderProductStatus.APPROVED)
                .build();
    }

    private List<SubscriptionOrderProduct> getPreviousCycleApprovedProducts(SubscriptionOrder subscriptionOrder) {
        int maxCycle = subscriptionOrder.getMaxCycleNumber();
        return subscriptionOrder.getSubscriptionOrderProducts().stream()
                .filter(product -> product.getCycleNumber() == maxCycle
                        && product.getOrderProductStatus() == OrderProductStatus.APPROVED)
                .collect(Collectors.toList());
    }

    @Scheduled(cron = "0 0 */3 * * *")
    @Transactional
    public void processDelaySubscriptionOrders() {
        List<SubscriptionOrder> delayOrders = subscriptionOrderRepository.findByOrderStatusOrderByNextOrderDateAsc(OrderStatus.DELAY);
        for (SubscriptionOrder order : delayOrders) {
            processSubscriptionOrder(order);
        }
    }

    @Override
    public SubscriptionOrderDetailResponse getSubscriptionOrderByMemberIdAndOrderId(Long memberId, Long customerId, Long orderId) {
        memberService.isExistMemberCustomer(memberId, customerId);

        SubscriptionOrder findSubscriptionOrder = subscriptionOrderRepository.findBySubscriptionOrderIdAndMemberMemberId(orderId, memberId)
                .orElseThrow(() -> new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));

        int latestCycleNumber = findSubscriptionOrder.getMaxCycleNumber();

        return new SubscriptionOrderDetailResponse(findSubscriptionOrder, latestCycleNumber);
    }

}
