package com.kh.mini.board.vo;

import lombok.Data;

@Data
public class BoardVo {
    private String no;
    private String parentNo;
    private String title;
    private String content;
    private String createdAt;
    private String modifiedAt;
    private String delYn;
    private String categoryNo;
}
