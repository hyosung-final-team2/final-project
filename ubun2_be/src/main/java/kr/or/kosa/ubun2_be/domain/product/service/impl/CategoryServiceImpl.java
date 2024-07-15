package kr.or.kosa.ubun2_be.domain.product.service.impl;

import kr.or.kosa.ubun2_be.domain.member.service.MemberService;
import kr.or.kosa.ubun2_be.domain.product.dto.CategoryResponse;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import kr.or.kosa.ubun2_be.domain.product.exception.category.CategoryException;
import kr.or.kosa.ubun2_be.domain.product.exception.category.CategoryExceptionType;
import kr.or.kosa.ubun2_be.domain.product.repository.CategoryRepository;
import kr.or.kosa.ubun2_be.domain.product.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;
    private final MemberService memberService;

    @Override
    public Category findCategoryByCategoryName(String categoryName) {
        Category category = categoryRepository.findByCategoryName(categoryName)
                .orElseThrow(() -> new CategoryException(CategoryExceptionType.NOT_EXIST_CATEGORY));
        return category;
    }

    @Override
    public List<CategoryResponse> getCategories(Long customerId, Long memberId) {
        memberService.isExistMemberCustomer(memberId, customerId);
        return categoryRepository.findDistinctByCustomerId(customerId).stream().map(CategoryResponse::new).toList();
    }
}
