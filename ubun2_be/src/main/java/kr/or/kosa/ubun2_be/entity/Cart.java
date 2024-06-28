package kr.or.kosa.ubun2_be.entity;

import jakarta.persistence.*;
import lombok.Getter;

import java.io.Serializable;

@Entity
@Getter
@Table(name = "cart")
public class Cart {
    @EmbeddedId
    private CartId id;

    @MapsId("memberId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @MapsId("customerId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @MapsId("productId")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(nullable = false)
    private int quantity;

    // Getters and setters

    @Embeddable
    public static class CartId implements Serializable {
        private Long memberId;
        private Long customerId;
        private Long productId;

    }
}