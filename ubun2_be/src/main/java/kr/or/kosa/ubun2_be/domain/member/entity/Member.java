package kr.or.kosa.ubun2_be.domain.member.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import kr.or.kosa.ubun2_be.domain.cart.entity.Cart;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import kr.or.kosa.ubun2_be.domain.notification.entity.Notification;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import kr.or.kosa.ubun2_be.domain.paymentmethod.entity.PaymentMethod;
import kr.or.kosa.ubun2_be.global.auth.enums.UserRole;
import kr.or.kosa.ubun2_be.global.auth.model.UserType;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Builder
@Table(name = "member")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class Member extends BaseTimeEntity implements UserType {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    @Column(nullable = false, unique = true)
    private String memberLoginId;

    @Column(nullable = false)
    private String memberPassword;

    @Column(nullable = false)
    private String memberName;

    @Column(nullable = false, unique = true)
    private String memberEmail;

    @Column(nullable = false)
    private String memberPhone;

    @Column
    private String paymentPassword;

    @Column
    @Enumerated(EnumType.STRING)
    private UserRole userRole;

    @Column
    private String fcmToken;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Address> addresses;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<PaymentMethod> paymentMethods;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<Order> orders ;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY)
    private List<SubscriptionOrder> subscriptionOrders;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Cart> carts;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<MemberCustomer> memberCustomers;

    @OneToMany(mappedBy = "member", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    private List<Notification> notifications;

    @Override
    public Long getId() {
        return this.memberId;
    }

    @Override
    public String getLoginId() {
        return this.memberLoginId;
    }

    @Override
    public String getPassword() {
        return this.memberPassword;
    }

    @Override
    public String getRole() {
        return this.userRole.name();
    }

    public void updateMember(String memberName, String memberEmail, String memberPhone) {
        this.memberName = memberName;
        this.memberEmail = memberEmail;
        this.memberPhone = memberPhone;
    }

    public void updateMemberPassword(String newPassword) {
        this.memberPassword = newPassword;
    }

    public void updateMemberFcmToken(String fcmToken) {
        this.fcmToken = fcmToken;
    }

    public void updatePaymentPassword(String paymentPassword) { this.paymentPassword = paymentPassword; }

}