package kr.or.kosa.ubun2_be.domain.address.dto;

import lombok.Getter;

@Getter
public class SearchRequest {
    private String searchType;
    private String searchKeyword;

    public SearchRequest(String searchType, String searchKeyword) {
        this.searchType = searchType;
        this.searchKeyword = searchKeyword;
    }
}
