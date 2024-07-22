package kr.or.kosa.ubun2_be.global.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ErrorDto {
    private int errorCode;
    private HttpStatus httpStatus;
    private String errorMessage;
    private Object data;
}
