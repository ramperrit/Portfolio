package com.portfolio.repository;

import com.portfolio.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.support.Querydsl;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import java.util.List;

public interface BoardRepository extends JpaRepository<Board,Long>, QuerydslPredicateExecutor<Board>, BoardRepositoryCustom {
//    List<Board> findByBTitle(String bTitle);
}
