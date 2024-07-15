//package kr.or.kosa.ubun2_be.global.auth.controller;
//
//import kr.or.kosa.ubun2_be.global.auth.service.LogoutService;
//import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestHeader;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//public class LogoutController {
//
//    private final LogoutService logoutService;
//
//    @PostMapping("/logout")
//    public ResponseDto<?> logout(@RequestHeader("Authorization") String token) {
//        System.out.println("controller : " + token);
//        logoutService.logout(token);
//        return ResponseDto.ok(null,"로그아웃 정상 완료");
//    }
//}
