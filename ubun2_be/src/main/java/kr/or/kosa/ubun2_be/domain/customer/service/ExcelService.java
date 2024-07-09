package kr.or.kosa.ubun2_be.domain.customer.service;

import kr.or.kosa.ubun2_be.domain.customer.dto.request.RegisterMemberRequest;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerException;
import kr.or.kosa.ubun2_be.domain.customer.exception.CustomerExceptionType;
import lombok.RequiredArgsConstructor;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

@Service
@RequiredArgsConstructor
public class ExcelService {

    private final CustomerService customerService;

    public ByteArrayResource createExcel() throws IOException {
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("회원_등록_양식");

        setDefaultColumnWidth(sheet);
        populateSheetWithData(workbook, sheet);

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();

        return new ByteArrayResource(out.toByteArray());
    }

    @Transactional
    public void registerExcel(Long customerId, MultipartFile file) throws IOException {
        List<String[]> data = parseExcel(file);
        registerMembersFromData(data, customerId);
    }

    private List<String[]> parseExcel(MultipartFile file) throws IOException {
        List<String[]> data = new ArrayList<>();
        Workbook workbook = new XSSFWorkbook(file.getInputStream());
        Sheet sheet = workbook.getSheetAt(0);

        for (int rowNum = 2; rowNum <= sheet.getLastRowNum(); rowNum++) {
            Row row = sheet.getRow(rowNum);
            List<String> rowData = new ArrayList<>();

            for (int colNum = 0; colNum < row.getLastCellNum(); colNum++) {
                Cell cell = row.getCell(colNum);
                String cellValue = cell.getStringCellValue();

                switch (colNum) {
                    case 0:
                        validateEmail(cellValue);
                        break;
                    case 1:
                        validateName(cellValue);
                        break;
                    case 2:
                        validatePhoneNumber(cellValue);
                        break;
                }
                rowData.add(cellValue);
            }
            data.add(rowData.toArray(new String[0]));
        }
        workbook.close();
        return data;
    }

    private void registerMembersFromData(List<String[]> data, Long customerId) {
        for (String[] rowData : data) {
            RegisterMemberRequest request = RegisterMemberRequest.createRegisterMemberRequest(rowData[0], rowData[1], rowData[2]);
            customerService.registerMember(request, customerId);
        }
    }

    private void populateSheetWithData(Workbook workbook, Sheet sheet) {
        String[][] data = {
                {"회원 이메일", "회원 이름", "전화번호"},
                {"ex) example@example.com", "ex) 김효성", "ex) 01077778888"}
        };

        CellStyle headerStyle = workbook.createCellStyle();
        headerStyle.setFillForegroundColor(IndexedColors.YELLOW.getIndex());
        headerStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        Font headerFont = workbook.createFont();
        headerFont.setBold(true);
        headerStyle.setFont(headerFont);

        CellStyle exampleStyle = workbook.createCellStyle();
        exampleStyle.setFillForegroundColor(IndexedColors.GREY_25_PERCENT.getIndex());
        exampleStyle.setFillPattern(FillPatternType.SOLID_FOREGROUND);

        Font exampleFont = workbook.createFont();
        exampleFont.setColor(IndexedColors.BLACK.getIndex());
        exampleStyle.setFont(exampleFont);

        int rowNum = 0;
        for (String[] rowData : data) {
            Row row = sheet.createRow(rowNum++);
            int colNum = 0;
            for (String cellData : rowData) {
                Cell cell = row.createCell(colNum++);
                cell.setCellValue(cellData);

                if (rowNum == 1) {
                    cell.setCellStyle(headerStyle);
                } else {
                    cell.setCellStyle(exampleStyle);
                }
            }
        }
    }

    private void setDefaultColumnWidth(Sheet sheet) {
        sheet.setDefaultColumnWidth(30);
    }

    public String getEncodedFileName(String fileName) throws UnsupportedEncodingException {
        return URLEncoder.encode(fileName, "UTF-8").replaceAll("\\+", "%20");
    }

    private void validateEmail(String email) {
        if (!isValidEmail(email)) {
            throw new CustomerException(CustomerExceptionType.INVALID_EXCEL_EMAIL_FORMAT);
        }
    }

    private void validateName(String name) {
        if (name.isEmpty()) {
            throw new CustomerException(CustomerExceptionType.INVALID_EXCEL_NAME_FORMAT);
        }
    }

    private void validatePhoneNumber(String phoneNumber) {
        if (!isValidPhoneNumber(phoneNumber)) {
            throw new CustomerException(CustomerExceptionType.INVALID_EXCEL_PHONE_FORMAT);
        }
    }

    private boolean isValidEmail(String email) {
        String emailRegex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,6}$";
        Pattern pattern = Pattern.compile(emailRegex);
        return pattern.matcher(email).matches();
    }

    private boolean isValidPhoneNumber(String phoneNumber) {
        String phoneRegex = "^010-\\d{4}-\\d{4}$";
        Pattern pattern = Pattern.compile(phoneRegex);
        return pattern.matcher(phoneNumber).matches();
    }
}