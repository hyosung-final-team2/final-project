package kr.or.kosa.ubun2_be.global.auth.model;

public interface UserType {
    Long getId();
    String getLoginId();
    String getPassword();
    String getRole();
}
