package com.portfolio.controller;

import com.portfolio.dto.BoardFormDto;
import com.portfolio.service.BoardService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/admin/board")
@RequiredArgsConstructor
public class BoardController {
    private final BoardService boardService;

//    @GetMapping("/new")
//    public String boardForm(Model model){
//        model.addAttribute("boardFormDto",new BoardFormDto());
//        return "board/boardForm";
//    }

    @PostMapping("/new")
    public ResponseEntity<?> boardNew(@Valid BoardFormDto boardFormDto,
                                      @RequestParam("boardImgFile") List<MultipartFile> boardImgFileList){
      try{
          boardService.saveBoard(boardFormDto, boardImgFileList);
          return new ResponseEntity<>("게시물 등록 성공", HttpStatus.CREATED);
      }catch (Exception e){
          return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
      }
    }





}
