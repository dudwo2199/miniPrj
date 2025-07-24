package com.kh.mini.finedustwarning.service;

import com.kh.mini.finedustwarning.mapper.FineDustWarningMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class FineDustWarningService {
    private final FineDustWarningMapper mapper;
}
