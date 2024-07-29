package kr.or.kosa.ubun2_be.global.auth.service;

import kr.or.kosa.ubun2_be.global.auth.dto.CheckLoginIdRequest;
import kr.or.kosa.ubun2_be.global.auth.dto.FindIdResponse;

public interface FindInfoService {

    FindIdResponse findId(String userName, String userEmail, String role);

    void findPassword(String userName, String userEmail, String userLoginId, String role);

    void resetPassword(String userEmail, String newPassword, String role);

    void checkLoginId(CheckLoginIdRequest checkLoginIdRequest);
}
