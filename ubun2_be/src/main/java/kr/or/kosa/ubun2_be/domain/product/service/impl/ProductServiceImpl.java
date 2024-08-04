package kr.or.kosa.ubun2_be.domain.product.service.impl;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import kr.or.kosa.ubun2_be.domain.member.service.MemberService;
import kr.or.kosa.ubun2_be.domain.product.dto.*;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductException;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductExceptionType;
import kr.or.kosa.ubun2_be.domain.product.repository.CategoryRepository;
import kr.or.kosa.ubun2_be.domain.product.repository.ProductRepository;
import kr.or.kosa.ubun2_be.domain.product.service.CategoryService;
import kr.or.kosa.ubun2_be.domain.product.service.ImageService;
import kr.or.kosa.ubun2_be.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CustomerService customerService;
    private final CategoryService categoryService;
    private final ImageService imageService;
    private final MemberService memberService;
    private final InventoryService inventoryService;
    private final CategoryRepository categoryRepository;

    @Override
    public Page<ProductResponse> getProducts(Long customerId, SearchRequest searchRequest, Pageable pageable,boolean isMember) {
        return productRepository.findProducts(customerId, searchRequest, pageable,isMember).map(ProductResponse::new);
    }

    @Override
    public ProductDetailResponse getProductByCustomerIdAndProductId(Long customerId, Long productId, boolean isMember) {
        Product findProduct = productRepository.findByIsDeletedFalseAndCustomerCustomerIdAndProductId(customerId, productId)
                .orElseThrow(() -> new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));

        return new ProductDetailResponse(findProduct);
    }

    @Transactional
    @Override
    public void registerProduct(MultipartFile image, List<MultipartFile> detailImages, Long customerId, ProductRequest productRequest) {
        if (isExistProductName(productRequest.getProductName())) {
            throw new ProductException(ProductExceptionType.DUPLICATE_PRODUCT_NAME);
        }
        Category category = categoryService.findCategoryByCategoryName(productRequest.getCategoryName());
        Customer customer = customerService.findById(customerId);
        Product saveProduct = productRepository.save(productRequest.toEntity(customer, category));
        inventoryService.saveStock(saveProduct.getProductId(), saveProduct.getStockQuantity());
        if (image==null ||image.isEmpty() || Objects.isNull(image.getOriginalFilename())) return;
        String url = imageService.uploadImage(image);
        saveProduct.saveImage(image.getOriginalFilename(), url);

        if (detailImages != null && !detailImages.isEmpty()) {
            for (MultipartFile detailImage : detailImages) {
                String detailImageUrl = imageService.uploadImage(detailImage);
                saveProduct.getDetailImagesPath().add(detailImageUrl);
            }
        }

    }

    @Transactional
    @Override
    public void modifyProduct(MultipartFile image, List<MultipartFile> detailImages, Long customerId, ProductRequest productRequest) { //productName 중복 체크
        Product findProduct = productRepository.findById(productRequest.getProductId())
                .orElseThrow(() -> new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));
        if (!findProduct.getProductName().equals(productRequest.getProductName())&&isExistProductName(productRequest.getProductName())) {
            throw new ProductException(ProductExceptionType.DUPLICATE_PRODUCT_NAME);
        }

        if (image != null && !image.isEmpty()) {//새로운 이미지 있을때
            String existingImageUrl = findProduct.getProductImagePath();
            if (existingImageUrl != null) {
                imageService.deleteImage(existingImageUrl);
            }
            String newImageUrl = imageService.uploadImage(image);
            findProduct.saveImage(image.getOriginalFilename(), newImageUrl);
        }

        List<String> updatedDetailImagePaths = new ArrayList<>(findProduct.getDetailImagesPath());
        for(int i = 0;i<productRequest.getChangeIndex().size();i++) { // i=0 , i=0, i=0->i=1
            int changeIndex = productRequest.getChangeIndex().get(i); //1, 2 , 0->2
            if (changeIndex >= 0 && changeIndex < 3) {
                // 기존 이미지 삭제 (있는 경우)
                if (changeIndex < updatedDetailImagePaths.size()) { //1<3, 2<2  0<3 2<3
                    imageService.deleteImage(updatedDetailImagePaths.get(changeIndex));
                }
                String newDetailImageUrl = imageService.uploadImage(detailImages.get(i));
                if (changeIndex < updatedDetailImagePaths.size()) {
                    updatedDetailImagePaths.set(changeIndex, newDetailImageUrl);
                } else {
                    updatedDetailImagePaths.add(newDetailImageUrl);
                }
            }

            updatedDetailImagePaths.removeIf(Objects::isNull);
            if (updatedDetailImagePaths.size() > 3) {
                updatedDetailImagePaths = updatedDetailImagePaths.subList(0, 3);
            }
            findProduct.getDetailImagesPath().clear();
            findProduct.getDetailImagesPath().addAll(updatedDetailImagePaths);


            findProduct.updateProduct(productRequest); //변경감지로 save 필요없음

            // 게시 -> redis.save / 미게시 ->redis.delete
            if (findProduct.isProductStatus()) {
                inventoryService.saveStock(productRequest.getProductId(), findProduct.getStockQuantity());
            } else {
                inventoryService.removeStock(productRequest.getProductId());
            }


        }
    }

    @Transactional
    @Override
    public void removeProduct(Long customerId, Long productId) {
        Product findProduct = productRepository.findByIsDeletedFalseAndCustomerCustomerIdAndProductId(customerId, productId)
                .orElseThrow(() -> new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));
        inventoryService.removeStock(findProduct.getProductId());
        if(findProduct.getProductImagePath()!=null) {
            imageService.deleteImage(findProduct.getProductImagePath());
        }
        productRepository.delete(findProduct);

    }

    @Override
    public boolean isExistProductName(String productName) {
        return productRepository.existsByIsDeletedFalseAndProductName(productName);
    }

    @Override
    public boolean checkValidation(ProductRequest productRequest) {
        return true;
    }

    @Override
    public Page<ProductResponse> getProducts(Long customerId, SearchRequest searchRequest, Pageable pageable,Long memberId) {
        memberService.isExistMemberCustomer(memberId, customerId);
        return getProducts(customerId,searchRequest,pageable, true);
    }

    @Override
    public ProductDetailResponse getProductByCustomerIdAndProductId(Long customerId, Long productId,Long memberId) {
        memberService.isExistMemberCustomer(memberId, customerId);
        return getProductByCustomerIdAndProductId(customerId, productId,true);
    }

    @Override
    public Product getProductById(Long productId) {
        return productRepository.findById(productId).orElseThrow(()->new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));
    }

    @Override
    public Page<ProductResponse> getProductsByCategory(Long customerId, CategoryRequest categoryRequest, Pageable pageable,Long memberId) {
        memberService.isExistMemberCustomer(memberId, customerId);
        return productRepository.findProductsByCategory(customerId, categoryRequest, pageable).map(ProductResponse::new);
    }

    @Override
    public List<CategoryResponse> getProductCategory() {
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(CategoryResponse::new)
                .toList();
    }

    @Transactional
    @Override
    public void removeSelectedProducts(ProductDeleteSelectedRequest productDeleteSelectedRequest, Long customerId) {
        for (Long productId : productDeleteSelectedRequest.getProductIdList()) {
            removeProduct(customerId, productId);
        }
    }

}
