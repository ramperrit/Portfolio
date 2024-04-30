package com.portfolio.repository;

import com.portfolio.dto.BoardSearchDto;
import com.portfolio.dto.MainBoardDto;
import com.portfolio.dto.QMainBoardDto;
import com.portfolio.entity.Board;
import com.portfolio.entity.QBoard;
import com.portfolio.entity.QBoardImg;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Wildcard;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
public class BoardRepositoryCustomImpl implements BoardRepositoryCustom{
    private final JPAQueryFactory queryFactory;
    private final QBoard board = QBoard.board;

    private BooleanExpression regDateAfter(String searchDateType){
        LocalDateTime dateTime = LocalDateTime.now();

        if (searchDateType == null || searchDateType.equals("all")){
            return null;
        }else if (searchDateType.equals("1d")){
            dateTime = dateTime.minusDays(1);
        }else if (searchDateType.equals("1w")){
            dateTime = dateTime.minusWeeks(1);
        }else if (searchDateType.equals("1m")){
            dateTime = dateTime.minusMonths(1);
        }else if (searchDateType.equals("6m")){
            dateTime = dateTime.minusMonths(6);
        }
        return board.regTime.after(dateTime);
    }

    private BooleanExpression searchByLike(String searchBy, String searchQuery){
        if (searchBy.equals("bName")){
            return board.bName.like("%" + searchQuery + "%");
        }else if (searchBy.equals("bTitle")){
            return board.bTitle.like("%" + searchQuery + "%");
        }
        return null;
    }


    @Override
    public Page<Board> getAdminBoardPage(BoardSearchDto boardSearchDto, Pageable pageable) {
        List<Board> content = queryFactory
                .selectFrom(board)
                .where(regDateAfter(boardSearchDto.getSearchDateType()),
                        searchByLike(boardSearchDto.getSearchBy(), boardSearchDto.getSearchQuery())
                )
                .orderBy(board.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(Wildcard.count)
                .from(board)
                .where(regDateAfter(boardSearchDto.getSearchDateType()),
                        searchByLike(boardSearchDto.getSearchBy(), boardSearchDto.getSearchQuery()))
                .fetchOne();

        if (total == null){
            total = 0L;
        }
        return new PageImpl<>(content, pageable, total);
    }

    @Override
    public Page<MainBoardDto> getMainBoardPage(BoardSearchDto boardSearchDto, Pageable pageable) {
        QBoardImg qBoardImg = QBoardImg.boardImg;

        List<MainBoardDto> content = queryFactory
                .select(new QMainBoardDto(
                        board.id,
                        board.bTitle,
                        board.bName,
                        board.bEmail,
                        board.bText,
                        board.bNumber,
                        board.bStack,
                        board.bDetail,
                        qBoardImg.imgUrl
                ))
                .from(qBoardImg)
                .join(qBoardImg.board, board)
                .where(qBoardImg.repimgYn.eq("Y"))
                .where(searchByLike("bTitle", boardSearchDto.getSearchQuery()))
                .orderBy(board.id.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long total = queryFactory
                .select(Wildcard.count)
                .from(qBoardImg)
                .join(qBoardImg.board, board)
                .where(qBoardImg.repimgYn.eq("Y"))
                .where(searchByLike("bTitle", boardSearchDto.getSearchQuery()))
                .fetchOne();

        if (total == null){
            total = 0L;
        }
        return new PageImpl<>(content, pageable, total);
    }

}
