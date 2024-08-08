package kr.or.kosa.ubun2_be.domain.product.repository;

import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.QueryResults;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.ComparableExpressionBase;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import kr.or.kosa.ubun2_be.domain.product.dto.CategoryRequest;
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

import static kr.or.kosa.ubun2_be.domain.product.entity.QCategory.category;
import static kr.or.kosa.ubun2_be.domain.product.entity.QProduct.product;

@Repository
public class ProductRepositoryImpl extends QuerydslRepositorySupport implements ProductRepositoryCustom {

    private static final List<String> STRING_SEARCH_FIELDS = List.of("productName", "productCategoryName");
    private static final List<String> NUMERIC_SEARCH_FIELDS = List.of("stockQuantity", "productPrice", "productDiscount");

    public ProductRepositoryImpl() {
        super(Product.class);
    }

    @Override
    public Page<Product> findProducts(Long customerId, SearchRequest searchRequest, Pageable pageable, boolean isMember) {
        QueryResults<Product> results = from(product)
                .join(product.category, category)
                .where(product.isDeleted.isFalse(), product.customer.customerId.eq(customerId), productSearch(searchRequest), productStatusForMember(isMember))
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
        String category = searchRequest.getSearchCategory();
        String keyword = searchRequest.getSearchKeyword();

        ComparableExpressionBase<?> path = getPath(category);
        if (path == null) {
            return new BooleanBuilder();
        }

        if (STRING_SEARCH_FIELDS.contains(category)) {
            return new BooleanBuilder().and(((StringPath) path).containsIgnoreCase(keyword));
        } else if (NUMERIC_SEARCH_FIELDS.contains(category)) {
            return numericSearch((NumberPath<?>) path, keyword);
        }

        return new BooleanBuilder();
    }

    private BooleanBuilder numericSearch(NumberPath<?> path, String keyword) {
        String[] range = keyword.split(",");
        if (range.length != 2) return new BooleanBuilder();

        try {
            Long start = Long.parseLong(range[0].trim());
            Long end = Long.parseLong(range[1].trim());
            return new BooleanBuilder().and(path.between(start, end));
        } catch (NumberFormatException e) {
            return new BooleanBuilder();
        }
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
        return switch (property) {
            case "productId" -> product.productId;
            case "productCategoryName" -> category.categoryName;
            case "productName" -> product.productName;
            case "stockQuantity" -> product.stockQuantity;
            case "productPrice" -> product.productPrice;
            case "productDiscount" -> product.productDiscount;
            case "productStatus" -> product.productStatus;
            case "orderOption" -> product.orderOption;
            default -> null;
        };
    }

    @Override
    public Page<Product> findProductsByCategory(Long customerId, CategoryRequest categoryRequest, Pageable pageable) {
        QueryResults<Product> results = from(product)
                .where(product.isDeleted.isFalse(), product.customer.customerId.eq(customerId), categorySearch(categoryRequest), productStatusForMember(true))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(product.createdAt.desc()) //생성날짜 내림차순
                .fetchResults();

        List<Product> content = results.getResults();
        long total = results.getTotal();
        return new PageImpl<>(content, pageable, total);
    }

    private BooleanBuilder categorySearch(CategoryRequest categoryRequest) {
        if (categoryRequest == null || categoryRequest.getCategoryName() == null || categoryRequest.getCategoryName().trim().isEmpty()) {
            return new BooleanBuilder();
        }
        return new BooleanBuilder().and(product.category.categoryName.eq(categoryRequest.getCategoryName()));
    }
}
