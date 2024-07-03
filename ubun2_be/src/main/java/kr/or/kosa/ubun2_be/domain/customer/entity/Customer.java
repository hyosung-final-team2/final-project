package kr.or.kosa.ubun2_be.domain.customer.entity;

import jakarta.persistence.*;
import kr.or.kosa.ubun2_be.domain.cart.entity.Cart;
import kr.or.kosa.ubun2_be.domain.member.entity.PendingMember;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.common.entity.BaseTimeEntity;
import kr.or.kosa.ubun2_be.domain.member.entity.MemberCustomer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "customer")
public class Customer extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long customerId;

    @Column(nullable = false, unique = true)
    private String customerLoginId;

    @Column(nullable = false)
    private String customerPassword;

    @Column(nullable = false)
    private String customerName;

    @Column(nullable = false)
    private String customerPhone;

    @Column(nullable = false, unique = true)
    private String customerEmail;

    @Column(nullable = false)
    private String businessRegistrationNumber;

    @Column(nullable = false)
    private String businessName;

    @Column(nullable = false)
    private String businessOwner;

    @Column(nullable = false)
    private LocalDateTime businessOpenDate;

    @Column(nullable = false)
    private String businessAddress;

    @Column(nullable = false)
    private String description;

    @Column
    private String logoImageOriginalName;

    @Column
    private String logoImagePath;

    @Column
    private String announcement;

    @OneToMany(mappedBy = "customer")
    private List<MemberCustomer> memberCustomers;

    @OneToMany(mappedBy = "customer")
    private List<Cart> carts ;

    @OneToMany(mappedBy = "customer")
    private List<Product> products;

    @OneToMany(mappedBy = "customer")
    private List<PendingMember> pendingMembers;
}

