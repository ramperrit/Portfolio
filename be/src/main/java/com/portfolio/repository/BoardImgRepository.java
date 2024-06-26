package com.portfolio.repository;

import com.portfolio.entity.BoardImg;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardImgRepository extends JpaRepository<BoardImg, Long> {
    List<BoardImg> findByBoardIdOrderByIdAsc(Long boardId);

    BoardImg findByBoardIdAndRepimgYn(Long boardId, String repimgYn);
}
