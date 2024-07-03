package kr.or.kosa.ubun2_be.domain.product.service;

import kr.or.kosa.ubun2_be.domain.product.dto.ProductDeleteRequest;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductDetailResponse;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductRequest;
import kr.or.kosa.ubun2_be.domain.product.dto.ProductResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductService {

    List<ProductResponse> findProductsByCustomerId(Long customerId);
    ProductDetailResponse findByCustomerIdAndProductId(Long customerId, Long productId);
    void insertProduct(MultipartFile image, Long customerId, ProductRequest productRequest);
    void updateProduct(MultipartFile image,Long customerId, ProductRequest productUpdateRequest);
    void deleteProduct(Long customerId, ProductDeleteRequest productDeleteRequest);
    boolean isExistProductName(String productName);
    boolean checkValidation(ProductRequest productRequest);
}
