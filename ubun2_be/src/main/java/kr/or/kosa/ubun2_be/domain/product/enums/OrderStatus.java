package kr.or.kosa.ubun2_be.domain.product.enums;

public enum OrderStatus {
    APPROVED("승인"), DENIED("거절"), PENDING("대기"), MODIFIED("변경"), DELAY("연기");

    private final String name;
    // 승인, 거절, 대기, 변경, 지연
    OrderStatus(String name) {
        this.name = name;
    }
    public String getName(){
        return name;
    }
}
