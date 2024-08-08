package kr.or.kosa.ubun2_be.domain.product.service.impl;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import kr.or.kosa.ubun2_be.domain.product.exception.image.ImageException;
import kr.or.kosa.ubun2_be.domain.product.exception.image.ImageExceptionType;
import kr.or.kosa.ubun2_be.domain.product.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URL;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageServiceImpl implements ImageService {

    private final AmazonS3 amazonS3;
    private static final List<String> ALLOWED_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png", "gif");

    @Value("${cloud.aws.s3.bucketName}")
    private String bucket;

    @Override
    public String uploadImage(MultipartFile multipartFile) {
        try {
            String originalImageName = multipartFile.getOriginalFilename();
            String storedImageName = UUID.randomUUID() + "." + extractValidImageExtension(originalImageName);
            ObjectMetadata metadata = createObjectMetadata(multipartFile);
            amazonS3.putObject(bucket, storedImageName, multipartFile.getInputStream(), metadata);
            return amazonS3.getUrl(bucket, storedImageName).toString();
        } catch (IOException e) {
            throw new ImageException(ImageExceptionType.IMAGE_SAVE_FAILED);
        }

    }

    private String extractValidImageExtension(String originalImageName) {
        int lastDotIndex = originalImageName.lastIndexOf(".");
        if (lastDotIndex == -1) {
            throw new ImageException(ImageExceptionType.NO_IMAGE_EXTENSION);
        }
        String extension = originalImageName.substring(lastDotIndex + 1).toLowerCase();
        if (!ALLOWED_EXTENSIONS.contains(extension)) {
            throw new ImageException(ImageExceptionType.NOT_IMAGE_FORMAT);
        }
        return extension;
    }

    private ObjectMetadata createObjectMetadata(MultipartFile multipartFile) {
        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());
        return metadata;
    }

    @Override
    public void deleteImage(String imagePath) {

        String storedImageName = getStoredImageName(imagePath);
        if (storedImageName.isEmpty()) {
            throw new ImageException(ImageExceptionType.IMAGE_DELETE_FAILED);
        }
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, storedImageName));
    }

    private String getStoredImageName(String imagePath) {
        try {
            URL url = new URL(imagePath);
            String decodingPath = URLDecoder.decode(url.getPath(), StandardCharsets.UTF_8);
            return decodingPath.substring(1);
        } catch (Exception e) {
            throw new ImageException(ImageExceptionType.IMAGE_PATH_DECODING_FAILED);
        }
    }
}
