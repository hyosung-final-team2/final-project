package kr.or.kosa.ubun2_be.domain.cart.service.impl;

import kr.or.kosa.ubun2_be.domain.cart.dto.CartProductRequest;
import kr.or.kosa.ubun2_be.domain.cart.dto.CartRequest;
import kr.or.kosa.ubun2_be.domain.cart.entity.Cart;
import kr.or.kosa.ubun2_be.domain.cart.entity.CartProduct;
import kr.or.kosa.ubun2_be.domain.cart.exception.CartException;
import kr.or.kosa.ubun2_be.domain.cart.exception.CartExceptionType;
import kr.or.kosa.ubun2_be.domain.cart.repository.CartProductRepository;
import kr.or.kosa.ubun2_be.domain.cart.repository.CartRepository;
import kr.or.kosa.ubun2_be.domain.cart.service.CartService;
import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.repository.CustomerRepository;
import kr.or.kosa.ubun2_be.domain.member.entity.Member;
import kr.or.kosa.ubun2_be.domain.member.repository.MemberRepository;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartProductRepository cartProductRepository;
    private final ProductRepository productRepository;
    private final CustomerRepository customerRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    public void createCarts(Long memberId, List<CartRequest> cartRequests) {
        for (CartRequest cartRequest : cartRequests) {
            // Cart 생성
            Cart cart = findOrCreateCart(memberId, cartRequest.getCustomerId());

            // CartProduct 생성
            for (CartProductRequest cartProductRequest : cartRequest.getCartProducts()) {
                mapCartProduct(cart, cartProductRequest);
            }
            cartRepository.save(cart);
        }
    }

    // Cart 생성 메소드
    private Cart findOrCreateCart(Long memberId, Long customerId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new CartException(CartExceptionType.NOT_EXIST_MEMBER));
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new CartException(CartExceptionType.NOT_EXIST_CUSTOMER));

        return cartRepository.findByMemberIdAndCustomerId(memberId, customerId)
                .orElseGet(() -> Cart.builder()
                        .member(member)
                        .customer(customer)
                        .cartProducts(new ArrayList<>())
                        .build());
    }

    // CartProduct 생성 메소드
    private void mapCartProduct(Cart cart, CartProductRequest cartProductRequest) {
        Product product = productRepository.findById(cartProductRequest.getProductId())
                .orElseThrow(() -> new CartException(CartExceptionType.NO_EXIST_PRODUCT));
        CartProduct cartProduct = CartProduct.builder()
                .cart(cart)
                .product(product)
                .quantity(cartProductRequest.getQuantity())
                .orderOption(cartProductRequest.getOrderOption())
                .build();
        cart.getCartProducts().add(cartProduct);
    }
}