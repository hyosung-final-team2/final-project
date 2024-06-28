package kr.or.kosa.ubun2_be.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Table(name = "customer")
public class Customer {
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

    private String logoImageOriginalName;

    private String logoImagePath;

    private String notification;

    @Column(nullable = false)
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "customer")
    private List<MemberCustomer> memberCustomers = new ArrayList<>();

    @OneToMany(mappedBy = "customer")
    private List<Cart> carts = new ArrayList<>();

    @OneToMany(mappedBy = "customer")
    private List<Product> products = new ArrayList<>();

}

