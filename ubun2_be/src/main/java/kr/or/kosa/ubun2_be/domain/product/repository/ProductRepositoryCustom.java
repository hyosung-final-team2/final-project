package kr.or.kosa.ubun2_be.domain.product.repository;

import kr.or.kosa.ubun2_be.domain.product.dto.SearchRequest;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ProductRepositoryCustom {
    Page<Product> findProducts(Long customerId, SearchRequest searchRequest, Pageable pageable, boolean isMember);

}
