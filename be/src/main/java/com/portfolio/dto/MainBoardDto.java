package com.portfolio.dto;

import com.querydsl.core.annotations.QueryProjection;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class MainBoardDto {
    private Long id;
    private String bTitle;
    private String bName;
    private String bNumber;
    private String bEmail;
    private String bText;
    private String bStack;
    private String bDetail;
    private String imgUrl;

    @QueryProjection
    public MainBoardDto(Long id, String bTitle, String bName, String bNumber, String bEmail, String bText, String bStack, String bDetail, String imgUrl){
        this.id = id;
        this.bTitle = bTitle;
        this.bName = bName;
        this.bNumber = bNumber;
        this.bEmail = bEmail;
        this.bText = bText;
        this.bStack = bStack;
        this.bDetail = bDetail;
        this.imgUrl = imgUrl;
    }

}
