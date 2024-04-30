package com.portfolio.service;

import com.portfolio.dto.BoardFormDto;
import com.portfolio.dto.BoardSearchDto;
import com.portfolio.dto.MainBoardDto;
import com.portfolio.entity.Board;
import com.portfolio.entity.BoardImg;
import com.portfolio.repository.BoardImgRepository;
import com.portfolio.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardService {
    private final BoardRepository boardRepository;
    private final BoardImgService boardImgService;
    private final BoardImgRepository boardImgRepository;

    public Long saveBoard(BoardFormDto boardFormDto, List<MultipartFile> boardImgFileList) throws Exception{
        Board board = boardFormDto.createBoard();
        boardRepository.save(board);

        for (int i=0; i<boardImgFileList.size();i++){
            BoardImg boardImg = new BoardImg();
            boardImg.setBoard(board);
            if (i==0){
                boardImg.setRepimgYn("Y");
            }else {
                boardImg.setRepimgYn("N");
            }
            boardImgService.saveBoardImg(boardImg, boardImgFileList.get(i));
        }
        return board.getId();
    }


    @Transactional(readOnly = true)
    public Page<Board> getAdminBoardPage(BoardSearchDto boardSearchDto, Pageable pageable){
        return boardRepository.getAdminBoardPage(boardSearchDto, pageable);
    }

    @Transactional(readOnly = true)
    public Page<MainBoardDto> getMainBoardPage(BoardSearchDto boardSearchDto, Pageable pageable){
        return boardRepository.getMainBoardPage(boardSearchDto, pageable);
    }










}
