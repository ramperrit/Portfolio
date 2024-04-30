package com.portfolio.repository;

import com.portfolio.dto.BoardSearchDto;
import com.portfolio.dto.MainBoardDto;
import com.portfolio.entity.Board;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface BoardRepositoryCustom {
    Page<Board> getAdminBoardPage(BoardSearchDto boardSearchDto, Pageable pageable);

    Page<MainBoardDto> getMainBoardPage(BoardSearchDto boardSearchDto, Pageable pageable);
}
