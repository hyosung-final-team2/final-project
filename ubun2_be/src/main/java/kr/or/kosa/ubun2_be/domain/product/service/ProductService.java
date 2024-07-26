package kr.or.kosa.ubun2_be.domain.product.service;

import kr.or.kosa.ubun2_be.domain.product.dto.*;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


public interface ProductService {

    Page<ProductResponse> getProducts(Long customerId,SearchRequest searchRequest,Pageable pageable,boolean isMember);
    ProductDetailResponse getProductByCustomerIdAndProductId(Long customerId, Long productId,boolean isMember);
    void registerProduct(MultipartFile image, Long customerId, ProductRequest productRequest);
    void modifyProduct(MultipartFile image,Long customerId, ProductRequest productUpdateRequest);
    void removeProduct(Long customerId, Long productId);
    boolean isExistProductName(String productName);
    boolean checkValidation(ProductRequest productRequest);
    Page<ProductResponse> getProducts(Long customerId, SearchRequest searchRequest, Pageable pageable,Long memberId);
    ProductDetailResponse getProductByCustomerIdAndProductId(Long customerId, Long productId,Long memberId);
    Product getProductById(Long productId);
    Page<ProductResponse> getProductsByCategory(Long customerId, CategoryRequest categoryRequest, Pageable pageable, Long memberId);
    List<CategoryResponse> getProductCategory();
    void removeSelectedProducts(DeleteSelectedProductRequest deleteSelectedProductRequest, Long customerId);
}
