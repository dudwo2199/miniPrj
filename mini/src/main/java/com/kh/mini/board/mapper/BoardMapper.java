package com.kh.mini.board.mapper;

import com.kh.mini.board.vo.BoardVo;
import com.kh.mini.board.vo.CategoryVo;
import com.kh.mini.common.page.PageVo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BoardMapper {
    @Select("""
            SELECT COUNT(NO) FROM MINI_BOARD WHERE DEL_YN = 'N' AND PARENT_NO IS NULL
            """)
    int getRowCount();

    @Insert("""
            INSERT INTO MINI_BOARD(NO, TITLE, CONTENT, CATEGORY_NO, PARENT_NO)
            VALUES(SEQ_MINI_BOARD_ID.NEXTVAL, #{title}, #{content}, #{categoryNo}, #{parentNo})
            """)
    int insert(BoardVo vo);

    @Select("""
            SELECT
                NO
                , PARENT_NO
                , TITLE
                , CREATED_AT
                , MODIFIED_AT
                , CATEGORY_NO
            FROM
                MINI_BOARD
            WHERE
                DEL_YN = 'N'
                AND PARENT_NO IS NULL
            ORDER BY NO DESC
            OFFSET #{pvo.offset} ROWS FETCH NEXT #{pvo.boardLimit} ROWS ONLY
            """)
    List<BoardVo> selectBoards(@Param("pvo") PageVo pvo);

    @Select("""
            SELECT
                NO
                , PARENT_NO
                , TITLE
                , CREATED_AT
                , MODIFIED_AT
                , CATEGORY_NO
            FROM
                MINI_BOARD
            WHERE
                DEL_YN = 'N'
            ORDER BY NO DESC
            """)
    List<BoardVo> selectBoardAll();

    @Select("""
            SELECT
                NO
                , PARENT_NO
                , TITLE
                , CONTENT
                , CREATED_AT
                , MODIFIED_AT
                , CATEGORY_NO
            FROM
                MINI_BOARD
            WHERE
                NO = #{no}
                AND DEL_YN = 'N'
            """)
    BoardVo selectOne(String no);

    @Select("""
            SELECT
                NO
                , PARENT_NO
                , TITLE
                , CONTENT
                , CREATED_AT
                , MODIFIED_AT
                , CATEGORY_NO
            FROM
                MINI_BOARD
            WHERE
                PARENT_NO = #{no}
                AND DEL_YN = 'N'
            """)
    List<BoardVo> selectChild(String no);

    @Delete("""
            UPDATE
                MINI_BOARD
            SET
                DEL_YN = 'Y'
            WHERE
                NO = #{no}
                AND DEL_YN = 'N'
            """)
    int delete(String no);

    @Update("""
            UPDATE
                MINI_BOARD
            SET
                TITLE = #{title}
                , CONTENT = #{content}
                , MODIFIED_AT = SYSDATE
                , CATEGORY_NO = #{categoryNo}
            WHERE
                NO = #{no}
                AND DEL_YN = 'N'
            """)
    int update(BoardVo vo);

    @Select("""
            SELECT
                CATEGORY_NO
                , CATEGORY_NAME
            FROM
                MINI_CATEGORY
            ORDER BY CATEGORY_NO
            """)
    List<CategoryVo> getCategory();
}