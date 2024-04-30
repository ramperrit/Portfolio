package com.portfolio.dto;

import com.portfolio.entity.Board;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;
import org.modelmapper.ModelMapper;

import java.util.ArrayList;
import java.util.List;

@Getter @Setter
public class BoardFormDto {
    @NotBlank(message = "제목입력 필수")
    private String bTitle;

    @NotBlank(message = "이름입력 필수")
    private String bName;

    @NotBlank(message = "연락처입력 필수")
    private String bNumber;

    @NotBlank(message = "이메일입력 필수")
    @Email(message = "이메일 형식으로 작성")
    private String bEmail;

    @NotBlank(message = "한줄 소개입력 필수")
    private String bText;

    @NotBlank(message = "기술 스택입력 필수")
    private String bStack;

    @NotBlank(message = "소개 내용입력 필수")
    private String bDetail;

    private List<BoardImgDto> boardImgDtoList = new ArrayList<>();

    private List<Long> boardImgIds = new ArrayList<>();

    private static ModelMapper modelMapper = new ModelMapper();

    public Board createBoard(){
        return modelMapper.map(this, Board.class);
    }

    public static BoardFormDto of(Board board){
        return modelMapper.map(board, BoardFormDto.class);
    }


}
