package kr.or.kosa.ubun2_be.domain.product.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.support.QuerydslRepositorySupport;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

import static kr.or.kosa.ubun2_be.domain.product.entity.QProduct.product;

@Repository
public class ProductRepositoryImpl extends QuerydslRepositorySupport implements ProductRepositoryCustom {
    public ProductRepositoryImpl() {
        super(Product.class);
    }

    @Override
    public Page<Product> findProducts(Long customerId, SearchRequest searchRequest, Pageable pageable, boolean isMember) {
        QueryResults<Product> results = from(product)
                .where(product.customer.customerId.eq(customerId), productSearch(searchRequest), productStatusForMember(isMember))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(productSort(pageable).stream().toArray(OrderSpecifier[]::new))
                .fetchResults();

        List<Product> content = results.getResults();
        long total = results.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    private BooleanBuilder productStatusForMember(boolean isMember) {
        return isMember ? new BooleanBuilder().and(product.productStatus.isTrue()) : null;
    }

    private BooleanBuilder productSearch(SearchRequest searchRequest) {
        if (searchRequest == null || searchRequest.getSearchCategory() == null || searchRequest.getSearchKeyword() == null) {
            return null;
        }
        return new BooleanBuilder().and(product.productName.containsIgnoreCase(searchRequest.getSearchKeyword()));
    }

    private List<OrderSpecifier<?>> productSort(Pageable pageable) {
        List<OrderSpecifier<?>> orderSpecifiers = new ArrayList<>();
        if (!ObjectUtils.isEmpty(pageable.getSort())) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                OrderSpecifier<?> orderSpecifier = createOrderSpecifier(direction, order.getProperty());
                if (orderSpecifier != null) {
                    orderSpecifiers.add(orderSpecifier);
                }
            }
        }
        return orderSpecifiers;
    }

    private OrderSpecifier<?> createOrderSpecifier(Order direction, String property) {
        ComparableExpressionBase<?> path = getPath(property);
        if (path != null) {
            return new OrderSpecifier<>(direction, path);
        }
        return null;
    }

    private ComparableExpressionBase<?> getPath(String property) {
        switch (property) {
            case "productId":
                return product.productId;
            case "productName":
                return product.productName;
            case "stockQuantity":
                return product.stockQuantity;
            case "productPrice":
                return product.productPrice;
            case "productDiscount":
                return product.productDiscount;
            case "createdAt":
                return product.createdAt;
            case "productStatus":
                return product.productStatus;
            case "orderOption":
                return product.orderOption;
            default:
                return null;
        }
    }
}
