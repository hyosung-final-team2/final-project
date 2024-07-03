package kr.or.kosa.ubun2_be.domain.product.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    String uploadImage(MultipartFile multipartFile);

    void deleteImage(String imagePath);

}
