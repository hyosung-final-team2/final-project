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
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;

import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@DiscriminatorColumn(name = "payment_type")
@Table(name = "payment_method")
@SQLDelete(sql="UPDATE payment_method SET is_deleted = true WHERE payment_method_id=?")
@Getter
public class PaymentMethod extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long paymentMethodId;

    @Column
    private String paymentMethodNickname;

    @Column(nullable = false)
    private boolean defaultStatus;

    @Column(name = "payment_type", insertable = false, updatable = false)
    private String paymentType;

    @Column
    @ColumnDefault("false")
    private boolean isDeleted;

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

    public PaymentMethod(Member member, String paymentMethodNickname) {
        this.member = member;
        this.paymentMethodNickname = paymentMethodNickname;
    }

    public PaymentMethod(Member member, String paymentMethodNickname, boolean defaultStatus) {
        this.member = member;
        this.paymentMethodNickname = paymentMethodNickname;
        this.defaultStatus = defaultStatus;
    }

    public PaymentMethod(String paymentMethodNickname){
        this.paymentMethodNickname = paymentMethodNickname;
    }

    public void update(String paymentMethodNickname) {
        this.paymentMethodNickname = paymentMethodNickname;
    }

    public void updateDefaultStatus(boolean defaultStatus) {
        this.defaultStatus = defaultStatus;
    }
}

