package com.portfolio.repository;

import com.portfolio.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board,Long> {
//    List<Board> findByBTitle(String bTitle);
}
