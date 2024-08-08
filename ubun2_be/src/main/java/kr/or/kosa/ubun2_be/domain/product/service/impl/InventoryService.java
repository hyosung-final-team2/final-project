package kr.or.kosa.ubun2_be.domain.product.service.impl;

import jakarta.transaction.Transactional;
import kr.or.kosa.ubun2_be.domain.product.entity.Product;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductException;
import kr.or.kosa.ubun2_be.domain.product.exception.product.ProductExceptionType;
import kr.or.kosa.ubun2_be.domain.product.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.SessionCallback;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class InventoryService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final ProductRepository productRepository;
    private static final String INVENTORY_KEY_PREFIX = "inventory:";

    @Transactional
    public void saveStock(Long productId, int quantity) {
        String key = INVENTORY_KEY_PREFIX + productId;
        redisTemplate.opsForValue().set(key, quantity);
    }

    public void removeStock(Long productId) {
        String key = INVENTORY_KEY_PREFIX + productId;
        redisTemplate.delete(key);
    }

    public int getStock(Long productId) {
        String key = INVENTORY_KEY_PREFIX + productId;
        Integer redisQuantity = (Integer) redisTemplate.opsForValue().get(key);

        if (redisQuantity == null) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));
            redisQuantity = product.getStockQuantity();
            redisTemplate.opsForValue().set(key, redisQuantity);
        }
        return redisQuantity;
    }

    @Transactional
    public boolean decreaseStock(Long productId, int quantity) {
        String key = INVENTORY_KEY_PREFIX + productId;
        Boolean success = redisTemplate.execute(new SessionCallback<Boolean>() {
            @Override
            @SuppressWarnings("unchecked")
            public Boolean execute(RedisOperations operations) throws DataAccessException {
                operations.watch(key);
                Integer currentQuantity = (Integer) operations.opsForValue().get(key);

                if (currentQuantity != null && currentQuantity >= quantity) {
                    operations.multi();
                    operations.opsForValue().set(key, currentQuantity - quantity);
                    return !operations.exec().isEmpty();
                }
                operations.unwatch();
                return false;
            }
        });

        if (Boolean.TRUE.equals(success)) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));
            product.updateStockQuantity(product.getStockQuantity() - quantity);
            productRepository.save(product); // 저장 호출 추가
            return true;
        }
        return false;
    }

    @Scheduled(fixedRate = 900000) // 15분마다 실행
    @Transactional
    public void syncInventory() {
        Set<String> keys = redisTemplate.keys(INVENTORY_KEY_PREFIX + "*");
        for (String key : keys) {
            Long productId = Long.parseLong(key.substring(INVENTORY_KEY_PREFIX.length()));
            Integer redisQuantity = (Integer) redisTemplate.opsForValue().get(key);

            if (redisQuantity == null) continue;
            Product product = productRepository.findById(productId)
                    .orElseGet(() -> {
                        redisTemplate.delete(key);
                        return null;
                    });
            if (product == null) continue;
            product.updateStockQuantity(redisQuantity);
            productRepository.save(product); //명시적 호출
        }
    }

    public void increaseStock(Long productId, int quantity) {
        String key = INVENTORY_KEY_PREFIX + productId;
        Boolean success = redisTemplate.execute(new SessionCallback<Boolean>() {
            @Override
            @SuppressWarnings("unchecked")
            public Boolean execute(RedisOperations operations) throws DataAccessException {
                operations.watch(key);
                Integer currentQuantity = (Integer) operations.opsForValue().get(key);

                if (currentQuantity != null) {
                    operations.multi();
                    operations.opsForValue().set(key, currentQuantity + quantity);
                    return !operations.exec().isEmpty();
                }
                operations.unwatch();
                return false;
            }
        });

        if (Boolean.TRUE.equals(success)) {
            Product product = productRepository.findById(productId)
                    .orElseThrow(() -> new ProductException(ProductExceptionType.NOT_EXIST_PRODUCT));
            product.updateStockQuantity(product.getStockQuantity() + quantity);
            productRepository.save(product);
        }
    }
}
