package kr.or.kosa.ubun2_be.domain.product.service.impl;

import kr.or.kosa.ubun2_be.domain.customer.entity.Customer;
import kr.or.kosa.ubun2_be.domain.customer.service.CustomerService;
import kr.or.kosa.ubun2_be.domain.product.dto.*;
import kr.or.kosa.ubun2_be.domain.product.entity.Category;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.repository.ProductRepository;
import kr.or.kosa.ubun2_be.domain.product.service.CategoryService;
import kr.or.kosa.ubun2_be.domain.product.service.ImageService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.mock.web.MockMultipartFile;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class ProductServiceImplTest {

    @InjectMocks
    private ProductServiceImpl productService;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private CustomerService customerService;
    @Mock
    private CategoryService categoryService;
    @Mock
    private ImageService imageService;
    @Mock
    private InventoryService inventoryService;

    private Product testProduct;
    private Customer testCustomer;
    private Category testCategory;

    @BeforeEach
    void setUp() {
        testCustomer = Customer.builder()
                .customerId(1L)
                .build();

        testCategory = Category.builder()
                .categoryId(1L)
                .categoryName("Test Category")
                .build();

        testProduct = Product.builder()
                .productId(1L)
                .productName("Test Product")
                .customer(testCustomer)
                .category(testCategory)
                .productImageOriginalName("originalName.jpg")
                .productImagePath("http://615cd965-8326-49e7-9856-cf6d4ed37976.jpg")
                .build();
    }

    @Test
    @DisplayName("상품 조회 - 성공")
    void getProducts() {
        //given
        SearchRequest searchRequest = new SearchRequest();
        Pageable pageable = PageRequest.of(0, 10);
        Page<Product> mockPage = new PageImpl<>(Arrays.asList(testProduct));

        when(productRepository.findProducts(anyLong(), any(SearchRequest.class), any(Pageable.class),anyBoolean()))
                .thenReturn(mockPage);

        //when
        Page<ProductResponse> result = productService.getProducts(1L, searchRequest, pageable,false);

        //then
        assertNotNull(result);
        assertEquals(1, result.getTotalElements());
        assertEquals("Test Product", result.getContent().get(0).getProductName());
    }

    @Test
    @DisplayName("상품 상세 조회 - 성공")
    void getProductByCustomerIdAndProductId() {
        //given
        when(productRepository.findByCustomerCustomerIdAndProductId(anyLong(), anyLong()))
                .thenReturn(Optional.of(testProduct));

        //when
        ProductDetailResponse result = productService.getProductByCustomerIdAndProductId(1L, 1L,false);

        //then
        assertNotNull(result);
        assertEquals("Test Product", result.getProductName());
    }

    @Test
    @DisplayName("상품 등록 - 성공")
    void registerProduct() {
        //given
        ProductRequest productRequest = new ProductRequest();
        productRequest.setProductName("New Product");
        productRequest.setCategoryName("Test Category");

        MockMultipartFile image = new MockMultipartFile("image", "test.jpg", "image/jpeg", "test image content".getBytes());

        when(productRepository.existsByProductName(anyString())).thenReturn(false);
        when(categoryService.findCategoryByCategoryName(anyString())).thenReturn(testCategory);
        when(customerService.findById(anyLong())).thenReturn(testCustomer);
        when(productRepository.save(any(Product.class))).thenReturn(testProduct);
        when(imageService.uploadImage(any())).thenReturn("http://615cd965-8326-49e7-9856-cf6d4ed37976.jpg");

        //when
        assertDoesNotThrow(() -> productService.registerProduct(image, 1L, productRequest));

        //then
        verify(productRepository).save(any(Product.class));
        verify(imageService).uploadImage(any());
        verify(inventoryService).saveStock(anyLong(), anyInt());

    }

    @Test
    @DisplayName("상품 수정 - 성공")
    void modifyProduct() {
        //given
        MockMultipartFile image = new MockMultipartFile("image", "updated.jpg", "image/jpeg", "updated image content".getBytes());

        ProductRequest productRequest = new ProductRequest();
        productRequest.setProductId(1L);
        productRequest.setProductName("Updated Product");
        productRequest.setStockQuantity(20);
        productRequest.setProductStatus(true);

        when(productRepository.findById(anyLong())).thenReturn(Optional.of(testProduct));
        when(productRepository.existsByProductName(anyString())).thenReturn(false);
        when(imageService.uploadImage(any())).thenReturn("http://a8d0d6d3-de4c-44ac-a0ce-aca5772bd30b.jpg");

        //when
        assertDoesNotThrow(() -> productService.modifyProduct(image, 1L, productRequest));

        //then
        verify(imageService).uploadImage(any());
        verify(imageService).deleteImage(anyString());
        verify(inventoryService).saveStock(anyLong(), anyInt());
    }

    @Test
    @DisplayName("상품 삭제 - 성공")
    void removeProduct() {
        //given
        Long productId = 1L;

        when(productRepository.findByCustomerCustomerIdAndProductId(anyLong(), anyLong()))
                .thenReturn(Optional.of(testProduct));

        //when
        assertDoesNotThrow(() -> productService.removeProduct(1L, productId));

        //then
        verify(imageService).deleteImage(anyString());
        verify(productRepository).delete(any(Product.class));
        verify(inventoryService).removeStock(anyLong());
    }
}