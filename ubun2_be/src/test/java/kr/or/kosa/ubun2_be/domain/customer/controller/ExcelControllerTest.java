package kr.or.kosa.ubun2_be.domain.customer.controller;

import kr.or.kosa.ubun2_be.common.CommonTestSetup;
import kr.or.kosa.ubun2_be.domain.customer.service.ExcelService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.user;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ExcelControllerTest extends CommonTestSetup {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ExcelService excelService;

    @Test
    @DisplayName("회원 등록 양식 다운로드")
    void downloadExcel() throws Exception {
        String fileName = "encoded_filename.xlsx";
        byte[] fileContent = "test content".getBytes();
        ByteArrayResource byteArrayResource = new ByteArrayResource(fileContent);

        when(excelService.getEncodedFileName(anyString())).thenReturn(fileName);
        when(excelService.createExcel()).thenReturn(byteArrayResource);

        mockMvc.perform(get("/api/download/excel")
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(header().string("Content-Disposition", "attachment;filename=\"" + fileName + "\""))
                .andExpect(content().contentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"))
                .andExpect(content().bytes(fileContent));

        verify(excelService).getEncodedFileName("회원_등록_양식.xlsx");
        verify(excelService).createExcel();
    }

    @Test
    @DisplayName("회원 등록 양식 업로드")
    void registerExcel() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file",
                "test.xlsx",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                "test content".getBytes()
        );

        doNothing().when(excelService).registerExcel(anyLong(), any());

        mockMvc.perform(multipart("/api/upload/excel")
                        .file(file)
                        .with(user(customer)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.message").value("회원 일괄 등록 완료"));

        verify(excelService).registerExcel(eq(customer.getUserId()), any());
    }
}