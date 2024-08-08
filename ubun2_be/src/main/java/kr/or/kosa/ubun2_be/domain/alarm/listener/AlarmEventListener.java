package kr.or.kosa.ubun2_be.domain.alarm.listener;

import kr.or.kosa.ubun2_be.domain.alarm.event.*;
import kr.or.kosa.ubun2_be.domain.alarm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AlarmEventListener {
    private final AlarmService alarmService;

    @EventListener
    public void handleSubscribeAlarmEvent(SubscribeAlarmEvent event) {
        alarmService.subscribeCustomer(event.getFcmToken(), event.getCustomerId());
    }

    @EventListener
    public void handleUnSubscribeAlarmEvent(UnSubscribeAlarmEvent event) {
        alarmService.unsubscribeCustomer(event.getFcmToken(), event.getCustomerId());
    }

    @EventListener
    public void handleOrderCreatedEvent(OrderCreatedEvent event) {
        alarmService.sendMessageToCustomer(event.getOrderRequest());
    }

    @EventListener
    public void handleSubCycleCompletedEvent(SubCycleCompletedEvent event) {
        alarmService.sendSubCycleMessage(event.getSubscriptionOrder(), event.getDelayReason());
    }

    @EventListener
    public void handleNoStockEvent(NoStockEvent event) {
        alarmService.sendNoStock(event.getSubscriptionOrderProduct(), event.getOrderId());
    }

    @EventListener
    public void handleCustomerNoStockEvent(CustomerNoStockAlarmEvent event) {
        alarmService.sendNoStock(event.getCustomer(), event.getProductName());
    }
}
