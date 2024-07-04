package kr.or.kosa.ubun2_be.domain.product.repository;

import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {
    Optional<Product> findByCustomerCustomerIdAndProductId(Long customerId, Long productId);

    boolean existsByProductName(String productName);
}
