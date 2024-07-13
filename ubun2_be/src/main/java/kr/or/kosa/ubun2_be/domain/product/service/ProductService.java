package kr.or.kosa.ubun2_be.domain.product.service;

import kr.or.kosa.ubun2_be.domain.product.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;


public interface ProductService {

    Page<ProductResponse> getProducts(Long customerId,SearchRequest searchRequest,Pageable pageable);
    ProductDetailResponse getProductByCustomerIdAndProductId(Long customerId, Long productId);
    void registerProduct(MultipartFile image, Long customerId, ProductRequest productRequest);
    void modifyProduct(MultipartFile image,Long customerId, ProductRequest productUpdateRequest);
    void removeProduct(Long customerId, Long productId);
    boolean isExistProductName(String productName);
    boolean checkValidation(ProductRequest productRequest);
}
