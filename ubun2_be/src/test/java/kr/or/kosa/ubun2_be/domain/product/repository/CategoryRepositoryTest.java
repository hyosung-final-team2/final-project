package kr.or.kosa.ubun2_be.domain.product.repository;

import jakarta.transaction.Transactional;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import java.util.Optional;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@Transactional
@ExtendWith(SpringExtension.class)
class CategoryRepositoryTest {

    @Autowired
    private CategoryRepository categoryRepository;

    @Test
    @DisplayName("카테고리명으로 카테고리 조회")
    void findCategoryName() {
        //given
        Category category = Category.builder().categoryName("food").build();
        categoryRepository.save(category);
        //when
        Optional<Category> findCategory = categoryRepository.findByCategoryName("food");
        //then
        Assertions.assertThat(category).isEqualTo(findCategory.get());
    }

}