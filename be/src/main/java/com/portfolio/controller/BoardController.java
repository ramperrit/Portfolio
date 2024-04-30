package com.portfolio.controller;

import com.portfolio.dto.BoardFormDto;
import com.portfolio.dto.BoardSearchDto;
import com.portfolio.dto.PageDto;
import com.portfolio.entity.Board;
import com.portfolio.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import static com.portfolio.util.ValidUtil.getStringResponseEntity;

@RestController
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

    @PostMapping("/admin/board/new")
    public ResponseEntity<?> boardNew(@Valid BoardFormDto boardFormDto, BindingResult bindingResult,
                                      List<MultipartFile> boardImgFileList){
        if (bindingResult.hasErrors()) return getStringResponseEntity(bindingResult);
        if (boardImgFileList==null || boardImgFileList.get(0).isEmpty()){
            return new ResponseEntity<>("최소 사진 한장은 등록해야합니다.", HttpStatus.BAD_REQUEST);
        }
      try{
          boardService.saveBoard(boardFormDto, boardImgFileList);
      }catch (Exception e){
          return new ResponseEntity<>("상품 등록 에러", HttpStatus.BAD_REQUEST);
      }
          return new ResponseEntity<>("게시물 등록 성공", HttpStatus.CREATED);
    }

    @PostMapping({"/user/boards", "/user/boards/{page}"})
    public ResponseEntity<PageDto<Board>> boardList(@RequestBody BoardSearchDto boardSearchDto,
                                                    @PathVariable("page")Optional<Integer> page){
        Pageable pageable = PageRequest.of(page.orElse(0),3);
        Page<Board> boards = boardService.getAdminBoardPage(boardSearchDto, pageable);
        return new ResponseEntity<>(new PageDto<>(boards, 5), HttpStatus.OK);
    }







}
