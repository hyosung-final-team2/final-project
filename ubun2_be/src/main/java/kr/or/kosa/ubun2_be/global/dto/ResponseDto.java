package kr.or.kosa.ubun2_be.global.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@Builder
public class ResponseDto<T> {
    private int stateCode;
    private boolean success;
    private T data;

    private String message;

    public ResponseDto(int stateCode, boolean success, T data, String msg){
        this.stateCode = stateCode;
        this.success = success;
        this.data = data;
        this.message = msg;
    }

    public ResponseDto<T> ok(T data, String msg) {
        return new ResponseDto<>(200, true, data, msg);
    }
}
