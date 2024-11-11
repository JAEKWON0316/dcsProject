package com.dcs.dcs_project.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dcs.dcs_project.entity.ImageEntity;
import com.dcs.dcs_project.service.ImageService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/images")
public class ImageController {

    private final ImageService iService;

    @GetMapping("/board/{dcsBoardId}")
    public ResponseEntity<List<ImageEntity>> getImagesByBoardId(@PathVariable Long dcsBoardId) {
        List<ImageEntity> images = iService.getImagesByBoardId(dcsBoardId);  // dcsBoardId로 이미지 조회
        return ResponseEntity.ok(images);
    }
}