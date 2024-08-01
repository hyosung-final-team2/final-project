package kr.or.kosa.ubun2_be.domain.address.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.order.entity.Order;
import kr.or.kosa.ubun2_be.domain.order.entity.SubscriptionOrder;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.SQLDelete;

import java.util.List;

@Entity
@Getter
@Table(name = "address")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@SQLDelete(sql = "UPDATE address SET is_deleted = true WHERE address_id=?")
public class Address extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long addressId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column
    private String addressNickname;

    @Column
    private String recipientName;

    @Column
    private String recipientPhone;

    @Column(nullable = false)
    private boolean defaultStatus;

    @Column(nullable = false)
    private String address;

    @Column
    @ColumnDefault("false")
    private boolean isDeleted;

    @OneToMany(mappedBy = "address", fetch = FetchType.LAZY)
    private List<Order> orders;

    @OneToMany(mappedBy = "address", fetch = FetchType.LAZY)
    private List<SubscriptionOrder> subscriptionOrders;

    @Builder
    public Address(Long addressId, Member member, String addressNickname, String recipientName, String recipientPhone, boolean defaultStatus, String address) {
        this.addressId = addressId;
        this.member = member;
        this.addressNickname = addressNickname;
        this.recipientName = recipientName;
        this.recipientPhone = recipientPhone;
        this.defaultStatus = defaultStatus;
        this.address = address;
    }

    public void updateAddress(String address, String addressNickname, String recipientName, String recipientPhone) {
        this.addressNickname = addressNickname;
        this.recipientName = recipientName;
        this.recipientPhone = recipientPhone;
        this.address = address;
    }

    public void updateDefaultStatus(boolean defaultStatus) {
        this.defaultStatus = defaultStatus;
    }

    public void updateAddress(String address) {
        this.address = address;
    }
}