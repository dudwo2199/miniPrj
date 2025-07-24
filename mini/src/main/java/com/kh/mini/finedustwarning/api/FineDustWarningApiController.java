package com.kh.mini.finedustwarning.api;

import com.kh.mini.finedustwarning.service.FineDustWarningService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/fine-dust-warning")
public class FineDustWarningApiController {
    private final FineDustWarningService service;

}
