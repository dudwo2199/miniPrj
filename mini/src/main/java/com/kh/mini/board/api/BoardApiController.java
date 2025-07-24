package com.kh.mini.board.api;

import com.kh.mini.board.service.BoardService;
import com.kh.mini.board.vo.BoardVo;
import com.kh.mini.board.vo.CategoryVo;
import com.kh.mini.common.page.PageVo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/board")
@RequiredArgsConstructor
public class BoardApiController {
    private final BoardService service;

    @GetMapping("/category")
    public ResponseEntity<List<CategoryVo>> getCatgegory(){
        var result = service.getCategory();

        return ResponseEntity
                .ok(result);
    }

    @PostMapping
    public ResponseEntity<Object> insert(@RequestBody BoardVo vo){

        var result = service.insert(vo);

        return ResponseEntity
                .ok(result);
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> selectList(@RequestParam(name = "currPage") int page){

        PageVo pvo = new PageVo(service.getRowCount(), page, 5, 10);

        var result = service.selectBoards(pvo);

        Map<String, Object> map = new HashMap<>();
        map.put("data", result);
        map.put("pvo", pvo);

        return ResponseEntity
                .ok(map);
    }

    @GetMapping("all")
    public ResponseEntity<List<BoardVo>> selectAll(){

        var result = service.selectBoardAll();

        return ResponseEntity
                .ok(result);
    }

    @GetMapping("/{no}")
    public ResponseEntity<BoardVo> selectOne(@PathVariable String no){
        var result = service.selectOne(no);

        return ResponseEntity
                .ok(result);
    }

    @GetMapping("/child/{no}")
    public ResponseEntity<List<BoardVo>> selectChild(@PathVariable String no){
        var result = service.selectChild(no);

        return ResponseEntity
                .ok(result);
    }

    @DeleteMapping("/{no}")
    public ResponseEntity<Object> delete(@PathVariable String no){
        var result = service.delete(no);

        return ResponseEntity
                .ok(result);
    }

    @PutMapping
    public ResponseEntity<Object> update(@RequestBody BoardVo vo){
        System.out.println("vo = " + vo);
        var result = service.update(vo);
        return ResponseEntity
                .ok(result);
    }
}
