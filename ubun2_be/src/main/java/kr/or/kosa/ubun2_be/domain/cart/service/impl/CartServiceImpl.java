package kr.or.kosa.ubun2_be.domain.cart.service.impl;

import kr.or.kosa.ubun2_be.domain.cart.dto.*;
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
import java.util.stream.Collectors;

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

        // 동일한 제품 ID와 주문 옵션을 가진 카트 제품이 있는지 확인
        CartProduct existCartProduct = cart.getCartProducts().stream()
                .filter(cp -> cp.getProduct().getProductId().equals(product.getProductId()) &&
                        cp.getOrderOption().equals(cartProductRequest.getOrderOption()))
                .findFirst()
                .orElse(null);

        if (existCartProduct != null) {
            existCartProduct.updateQuantity(existCartProduct.getQuantity() + cartProductRequest.getQuantity());
            return;
        }

        CartProduct cartProduct = CartProduct.builder()
                .cart(cart)
                .product(product)
                .quantity(cartProductRequest.getQuantity())
                .orderOption(cartProductRequest.getOrderOption())
                .build();
        cart.getCartProducts().add(cartProduct);
    }

    @Override
    public List<CartResponse> getCarts(Long userId) {
        List<Cart> carts = cartRepository.findByMemberId(userId);
        return carts.stream().map(CartResponse::new).collect(Collectors.toList());
    }

    @Transactional
    @Override
    public void updateCartProductQuantities(Long userId, List<CartProductUpdateRequest> cartProductUpdateRequests) {
        for (CartProductUpdateRequest cartProductUpdateRequest : cartProductUpdateRequests) {
            Cart cart = cartRepository.findByMemberIdAndCustomerId(userId, cartProductUpdateRequest.getCustomerId())
                    .orElseThrow(() -> new CartException(CartExceptionType.NO_EXIST_CART));

            for (CartProductDetailRequest cartProductDetailRequest : cartProductUpdateRequest.getCartProducts()) {
                CartProduct cartProduct = cartProductRepository.findByCartCartIdAndCartProductId(cart.getCartId(), cartProductDetailRequest.getCartProductId())
                        .orElseThrow(() -> new CartException(CartExceptionType.NO_EXIST_CART_PRODUCT));
                cartProduct.updateQuantity(cartProductDetailRequest.getQuantity());
            }
            cartRepository.save(cart);
        }
    }

    @Transactional
    @Override
    public void deleteCartProducts(Long userId, List<CartProductDeleteRequest> cartProductDeleteRequests) {
        for (CartProductDeleteRequest cartProductDeleteRequest : cartProductDeleteRequests) {
            Cart cart = cartRepository.findByMemberIdAndCustomerId(userId, cartProductDeleteRequest.getCustomerId())
                    .orElseThrow(() -> new CartException(CartExceptionType.NO_EXIST_CART));

            for (CartProductDetailRequest cartProductDetailRequest : cartProductDeleteRequest.getCartProducts()) {
                CartProduct cartProduct = cartProductRepository.findByCartCartIdAndCartProductId(cart.getCartId(), cartProductDetailRequest.getCartProductId())
                        .orElseThrow(() -> new CartException(CartExceptionType.NO_EXIST_CART_PRODUCT));
                cartProductRepository.delete(cartProduct);
            }
        }
    }

    @Override
    public Cart findByMemberIdAndCustomerId(Long memberId, Long customerId) {
        return cartRepository.findByMemberIdAndCustomerId(memberId, customerId)
                .orElseThrow(() -> new CartException(CartExceptionType.NO_EXIST_CART));
    }

}
