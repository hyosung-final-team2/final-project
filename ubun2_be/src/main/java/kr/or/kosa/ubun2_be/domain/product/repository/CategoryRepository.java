package kr.or.kosa.ubun2_be.domain.product.repository;

import io.lettuce.core.dynamic.annotation.Param;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByCategoryName(String categoryName);

    @Query("select distinct c from Category c join c.products p where p.customer.customerId = :customerId")
    List<Category> findDistinctByCustomerId(@Param("customerId") Long customerId);
}
