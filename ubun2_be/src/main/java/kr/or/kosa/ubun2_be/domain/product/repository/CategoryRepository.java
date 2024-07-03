package kr.or.kosa.ubun2_be.domain.product.repository;

import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {
    Optional<Category> findByCategoryName(String categoryName);
}
