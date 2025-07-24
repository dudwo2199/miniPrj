package com.kh.mini.finedustwarning.vo;

import lombok.Data;

@Data
public class FineDustWarningVo {
    private String clearVal;        //!< 해제시 미세먼지 농도(단위: ug/m3)
    private String sn;              //!< 미세먼지 경보 현황 일련번호
    private String districtName;    //!< 발령 지역 이름
    private String dataDate;        //!< 발령 날짜
    private String issueVal;        //!< 발령시 미세먼지 농도(단위: ug/m3)
    private String issueTime;       //!< 발령 시간
    private String clearDate;       //!< 해제 날짜
    private String issueDate;       //!< 발령 날짜
    private String moveName;        //!< 발령 권역 이름
    private String clearTime;       //!< 해제 시간
    private String issueGbn;        //!< 경보단계(주의보, 경보)
    private String itemCode;        //!< 미세먼지 항목 구분(PM10, PM25)
}