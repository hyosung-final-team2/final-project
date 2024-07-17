package kr.or.kosa.ubun2_be.domain.member.dto;

import kr.or.kosa.ubun2_be.domain.address.entity.Address;
import lombok.Getter;

@Getter
public class MyAddressResponse {
    private String address;

   public MyAddressResponse(Address address) {
       this.address = address.getAddress();
   }
}
