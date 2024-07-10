package kr.or.kosa.ubun2_be.domain.paymentmethod.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
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

}

