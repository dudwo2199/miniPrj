package com.kh.mini.finedustwarning.openapi;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@Component
public class FineDustWarningOpenApi {

    @Value("${open.api.url}")
    private String url;
    @Value("${open.api.servicekey}")
    private String serviceKey;

    public JsonNode reqFineDustWarning() throws IOException {
        StringBuilder urlBuilder = new StringBuilder(url); /*URL*/
        urlBuilder.append(String.format("?%s=%s", URLEncoder.encode("serviceKey", "UTF-8"), serviceKey)); /*Service Key*/
        urlBuilder.append(String.format("&%s=%s", URLEncoder.encode("returnType", "UTF-8"), URLEncoder.encode("JSON", "UTF-8"))); /*xml 또는 json*/
        urlBuilder.append(String.format("&%s=%s", URLEncoder.encode("numOfRows", "UTF-8"), URLEncoder.encode("100", "UTF-8"))); /*한 페이지 결과 수*/
        urlBuilder.append(String.format("&%s=%s", URLEncoder.encode("pageNo", "UTF-8"), URLEncoder.encode("1", "UTF-8"))); /*페이지번호*/
        urlBuilder.append(String.format("&%s=%s", URLEncoder.encode("year", "UTF-8"), URLEncoder.encode("2025", "UTF-8"))); /*측정 연도*/
        //urlBuilder.append(String.format("&%s=%s", URLEncoder.encode("itemCode", "UTF-8"), URLEncoder.encode("PM10", "UTF-8"))); /*미세먼지 항목 구분(PM10, PM25), PM10/PM25 모두 조회할 경우 파라미터 생략*/
        URL url = new URL(urlBuilder.toString());
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");
        conn.setRequestProperty("Content-type", "application/json");
        System.out.println("Response code: " + conn.getResponseCode());
        BufferedReader rd;
        if (conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
            rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        } else {
            rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
        }

        StringBuilder sb = new StringBuilder();
        String line;
        while ((line = rd.readLine()) != null) {
            sb.append(line);
        }
        rd.close();
        conn.disconnect();
//        System.out.println(sb.toString());
        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode items = null;
        try {
            // JSON 문자열을 Person 객체로 변환
            var node = objectMapper.readTree(sb.toString());

            items = node.get("response").get("body").get("items");
            // 변환된 객체 사용
            System.out.println(items.toString());

        } catch (IOException e) {
            e.printStackTrace();
        }

        return items;
    }
}
