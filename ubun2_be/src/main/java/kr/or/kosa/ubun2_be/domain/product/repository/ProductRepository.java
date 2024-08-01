package kr.or.kosa.ubun2_be.domain.product.repository;

import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, ProductRepositoryCustom {
    Optional<Product> findByIsDeletedFalseAndCustomerCustomerIdAndProductId(Long customerId, Long productId);
    boolean existsByIsDeletedFalseAndProductName(String productName);

    long countByIsDeletedFalseAndCustomerCustomerId(Long customerId);
    long countByIsDeletedFalseAndCustomerCustomerIdAndProductStatus(Long customerId, boolean productStatus);
}
