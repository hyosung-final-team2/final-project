package kr.or.kosa.ubun2_be.domain.product.service.impl;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductDeleteRequest;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductDetailResponse;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductRequest;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductResponse;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductException;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductExceptionType;
import kr.or.kosa.ubun2_be.domain.product.repository.ProductRepository;
import kr.or.kosa.ubun2_be.domain.product.service.CategoryService;
import kr.or.kosa.ubun2_be.domain.product.service.ImageService;
import kr.or.kosa.ubun2_be.domain.product.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CustomerService customerService;
    private final CategoryService categoryService;
    private final ImageService imageService;

    @Override
    public List<ProductResponse> findProductsByCustomerId(Long customerId) {
        List<ProductResponse> productResponseList = productRepository.findByCustomerCustomerId(customerId)
                .stream().map(entity -> new ProductResponse(entity))
                .collect(Collectors.toList());
        return productResponseList;
    }

    @Override
    public ProductDetailResponse findByCustomerIdAndProductId(Long customerId, Long productId) {
        Product findProduct = productRepository.findByCustomerCustomerIdAndProductId(customerId, productId)
                .orElseThrow(() -> new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));

        return new ProductDetailResponse(findProduct);
    }

    @Transactional
    @Override
    public void insertProduct(MultipartFile image, Long customerId, ProductRequest productRequest) {
        if (isExistProductName(productRequest.getProductName())) {
            throw new ProductException(ProductExceptionType.DUPLICATE_PRODUCT_NAME);
        }
        Category category = categoryService.findCategoryByCategoryName(productRequest.getCategoryName());
        Customer customer = customerService.findById(customerId);
        Product saveProduct = productRepository.save(productRequest.toEntity(customer, category));
        if (image.isEmpty() || Objects.isNull(image.getOriginalFilename())) return;
        String url = imageService.uploadImage(image);
        saveProduct.saveImage(image.getOriginalFilename(), url);

    }

    @Transactional
    @Override
    public void updateProduct(MultipartFile image, Long customerId, ProductRequest productRequest) { //productName 중복 체크
        Product findProduct = productRepository.findById(productRequest.getProductId())
                .orElseThrow(() -> new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));
        if (isExistProductName(productRequest.getProductName())) {
            throw new ProductException(ProductExceptionType.DUPLICATE_PRODUCT_NAME);
        }

        String existingImageUrl = findProduct.getProductImagePath();

        if (image != null && !image.isEmpty()) { //새로운 이미지 있을때
            String newImageUrl = imageService.uploadImage(image);
            productRequest.setProductImagePath(newImageUrl);
            productRequest.setProductImageOriginalName(image.getOriginalFilename());
        } else {
            productRequest.setProductImagePath(null);
            productRequest.setProductImageOriginalName(null);
        }
        findProduct.updateProduct(productRequest); //변경감지로 save 필요없음

        if (existingImageUrl != null) {
            imageService.deleteImage(existingImageUrl);
        }

    }

    @Transactional
    @Override
    public void deleteProduct(Long customerId, ProductDeleteRequest productDeleteRequest) {
        Product findProduct = productRepository.findByCustomerCustomerIdAndProductId(customerId, productDeleteRequest.getProductId())
                .orElseThrow(() -> new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));
        imageService.deleteImage(findProduct.getProductImagePath());
        productRepository.delete(findProduct);
    }

    @Override
    public boolean isExistProductName(String productName) {
        return productRepository.existsByProductName(productName);
    }

    @Override
    public boolean checkValidation(ProductRequest productRequest) {
        return true;
    }


}
