package com.kh.mini.board.mapper;

import com.kh.mini.board.vo.BoardVo;
import com.kh.mini.board.vo.CategoryVo;
import com.kh.mini.common.page.PageVo;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface BoardMapper {
    @Select("""
            SELECT COUNT(NO) FROM HW_BOARD WHERE DEL_YN = 'N'
            """)
    int getRowCount();

    @Insert("""
            INSERT INTO HW_BOARD(NO, TITLE, CONTENT, CATEGORY_NO)
            VALUES(SEQ_HW_BOARD_ID.NEXTVAL, #{title}, #{content}, #{categoryNo})
            """)
    int insert(BoardVo vo);

    @Select("""
            SELECT
                NO
                , TITLE
                , CREATED_AT
                , MODIFIED_AT
                , CATEGORY_NO
            FROM
                HW_BOARD
            WHERE
                DEL_YN = 'N'
            ORDER BY NO DESC
            OFFSET #{pvo.offset} ROWS FETCH NEXT #{pvo.boardLimit} ROWS ONLY
            """)
    List<BoardVo> selectBoards(@Param("pvo") PageVo pvo);

    @Select("""
            SELECT
                NO
                , TITLE
                , CONTENT
                , CREATED_AT
                , MODIFIED_AT
                , CATEGORY_NO
            FROM
                HW_BOARD
            WHERE
                NO = #{no}
                AND DEL_YN = 'N'
            """)
    BoardVo selectOne(String no);

    @Delete("""
            UPDATE
                HW_BOARD
            SET
                DEL_YN = 'Y'
            WHERE
                NO = #{no}
                AND DEL_YN = 'N'
            """)
    int delete(String no);

    @Update("""
            UPDATE
                HW_BOARD
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
                HW_CATEGORY
            ORDER BY CATEGORY_NO
            """)
    List<CategoryVo> getCategory();
}
