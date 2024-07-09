package kr.or.kosa.ubun2_be.domain.address.service;

import kr.or.kosa.ubun2_be.domain.address.dto.AddressResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AddressService {
    public Page<AddressResponse> getAllAddresses(Pageable pageable);
}
