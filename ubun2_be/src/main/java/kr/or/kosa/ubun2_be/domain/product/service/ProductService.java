package kr.or.kosa.ubun2_be.domain.product.service;

import kr.or.kosa.ubun2_be.domain.product.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    Page<ProductResponse> findProducts(Long customerId,SearchRequest searchRequest,Pageable pageable);
    ProductDetailResponse findByCustomerIdAndProductId(Long customerId, Long productId);
    void insertProduct(MultipartFile image, Long customerId, ProductRequest productRequest);
    void updateProduct(MultipartFile image,Long customerId, ProductRequest productUpdateRequest);
    void deleteProduct(Long customerId, ProductDeleteRequest productDeleteRequest);
    boolean isExistProductName(String productName);
    boolean checkValidation(ProductRequest productRequest);
}
