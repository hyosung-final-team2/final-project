package kr.or.kosa.ubun2_be.domain.customer.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;

@Service
public class ExcelService {

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

    private void populateSheetWithData(Workbook workbook, Sheet sheet) {
        String[][] data = {
                {"회원 이메일", "회원 이름", "전화번호"},
                {"ex) example@example.com", "ex) 김효성", "01077778888"}
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
}