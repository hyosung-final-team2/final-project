package kr.or.kosa.ubun2_be.domain.customer.controller;

import kr.or.kosa.ubun2_be.domain.customer.service.ExcelService;
import kr.or.kosa.ubun2_be.global.auth.model.CustomUserDetails;
import kr.or.kosa.ubun2_be.global.dto.ResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ExcelController {

    private final ExcelService excelService;

    @GetMapping("/download/excel")
    public ResponseEntity<InputStreamResource> downloadExcel() throws IOException {
        String fileName = excelService.getEncodedFileName("회원_등록_양식.xlsx");

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment;filename=\"" + fileName + "\"")
                .contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .body(new InputStreamResource(excelService.createExcel().getInputStream()));
    }

    @PostMapping("/upload/excel")
    public ResponseDto<?> registerExcel(@RequestParam("file") MultipartFile file, @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {
        excelService.registerExcel(customUserDetails.getUserId(), file);
        return ResponseDto.ok(null,"회원 일괄 등록 완료");
    }

}