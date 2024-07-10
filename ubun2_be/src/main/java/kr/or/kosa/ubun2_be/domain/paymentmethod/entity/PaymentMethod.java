package kr.or.kosa.ubun2_be.domain.paymentmethod.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import kr.or.kosa.ubun2_be.domain.paymentmethod.dto.MemberDetailPaymentMethodResponse;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@DiscriminatorColumn(name = "payment_type")
@Table(name = "payment_method")
@Getter
public class PaymentMethod extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentMethodId;

    @Column
    private String paymentMethodNickname;

    @Column(name = "payment_type", insertable = false, updatable = false)
    private String paymentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @OneToMany(mappedBy = "paymentMethod", fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToMany(mappedBy = "paymentMethod", fetch = FetchType.LAZY)
    private List<SubscriptionOrder> subscriptionOrders;

    public PaymentMethod(Member member) {
        this.member = member;
    }

    public MemberDetailPaymentMethodResponse toDTO() {
        return MemberDetailPaymentMethodResponse.builder()
                .paymentMethodId(this.paymentMethodId)
                .accountNumber(this instanceof AccountPayment ? ((AccountPayment) this).getAccountNumber() : null)
                .bankName(this instanceof AccountPayment ? ((AccountPayment) this).getBankName() : null)
                .cardCompanyName(this instanceof CardPayment ? ((CardPayment) this).getCardCompanyName() : null)
                .cardNumber(this instanceof CardPayment ? ((CardPayment) this).getCardNumber() : null)
                .build();
    }

    public static List<MemberDetailPaymentMethodResponse> toDTOList(List<PaymentMethod> paymentMethods) {
        return paymentMethods.stream().map(PaymentMethod::toDTO).collect(Collectors.toList());
    }

}

