package kr.or.kosa.ubun2_be.domain.customer.provider;

import kr.or.kosa.ubun2_be.domain.customer.dto.request.SmsRequest;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.model.Message;
import net.nurigo.sdk.message.request.SingleMessageSendingRequest;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class SmsProvider {

    private final DefaultMessageService messageService;

    @Value("${sms.from-number}") String from;


    public SmsProvider(@Value("${sms.api-key}") String API_KEY,
                       @Value("${sms.api-secret-key}") String API_SECRET,
                       @Value("${sms.api-domain}") String DOMAIN) {
        this.messageService = NurigoApp.INSTANCE.initialize(API_KEY,API_SECRET,DOMAIN);
    }

    public boolean sendSms(List<SmsRequest> nameAndPhoneNumbers, String businessName) {

        for (SmsRequest nameAndPhoneNumber : nameAndPhoneNumbers) {
            try {
                Message message = new Message();
                message.setFrom(from);
                message.setTo(nameAndPhoneNumber.getPhoneNumber());

                String smsText = "[효성CMS+ SQUARE] " + nameAndPhoneNumber.getMemberName() +"님, \n" + businessName + "(스토어)의 상품을 확인해보세요. \n <실제 url 보낼 곳> ";
                message.setText(smsText);

                messageService.sendOne(new SingleMessageSendingRequest(message));
            } catch (Exception exception) {
                return false;
            }
        }
        return true;
    }
}
