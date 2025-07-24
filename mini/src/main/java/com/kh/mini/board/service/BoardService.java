package com.kh.mini.board.service;

import com.kh.mini.board.mapper.BoardMapper;
import com.kh.mini.board.vo.BoardVo;
import com.kh.mini.board.vo.CategoryVo;
import com.kh.mini.common.page.PageVo;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BoardService {
    private final BoardMapper mapper;

    @Transactional
    public int insert(BoardVo vo) {
        var result = mapper.insert(vo);
        if (result != 1)
            throw new IllegalStateException("입력 실패");

        return result;
    }

    public List<BoardVo> selectBoards(PageVo pvo) {
        var result = mapper.selectBoards(pvo);
        if (result.isEmpty())
            throw new IllegalStateException("게시판 목록 읽어오기 실패");

        return result;
    }

    public List<BoardVo> selectBoardAll() {
        var result = mapper.selectBoardAll();
        if (result.isEmpty())
            throw new IllegalStateException("게시판 목록 읽어오기 실패");

        return result;
    }

    public BoardVo selectOne(String no) {
        var result = mapper.selectOne(no);
        if (result == null)
            throw new IllegalStateException("게시판 읽어오기 실패");

        return result;
    }

    @Transactional
    public int delete(String no) {
        var result = mapper.delete(no);

        if (result != 1)
            throw new IllegalStateException("삭제 실패");

        return result;
    }

    @Transactional
    public int update(BoardVo vo) {
        var result = mapper.update(vo);
        if (result != 1)
            throw new IllegalStateException("수정 실패");

        return result;
    }

    public int getRowCount() {
        return mapper.getRowCount();
    }

    public List<CategoryVo> getCategory() {
        return mapper.getCategory();
    }

    public List<BoardVo> selectChild(String no) {
        return mapper.selectChild(no);
    }
}