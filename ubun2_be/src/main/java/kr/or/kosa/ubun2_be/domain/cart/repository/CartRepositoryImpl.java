package kr.or.kosa.ubun2_be.domain.cart.repository;

import com.querydsl.core.QueryResults;
import com.querydsl.core.types.dsl.BooleanExpression;
import kr.or.kosa.ubun2_be.domain.cart.entity.Cart;
import kr.or.kosa.ubun2_be.domain.cart.entity.QCart;
import kr.or.kosa.ubun2_be.domain.cart.entity.QCartProduct;
import kr.or.kosa.ubun2_be.domain.product.entity.QProduct;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;

public class CartRepositoryImpl extends QuerydslRepositorySupport implements CartRepositoryCustom {
    public CartRepositoryImpl() {
        super(Cart.class);
    }

    @Override
    public Page<Cart> findCarts(Long userId, Pageable pageable) {
        QCart cart = QCart.cart;
        QCartProduct cartProduct = QCartProduct.cartProduct;
        QProduct product = QProduct.product;

        BooleanExpression condition = cart.member.memberId.eq(userId);

        QueryResults<Cart> results = from(cart)
                .leftJoin(cart.cartProducts, cartProduct).fetchJoin()
                .leftJoin(cartProduct.product, product).fetchJoin()
                .where(condition)
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetchResults();

        return new PageImpl<>(results.getResults(), pageable, results.getTotal());
    }
}