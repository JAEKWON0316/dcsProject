package com.dcs.dcs_project.controller;

import java.util.List;
import java.util.stream.Collectors;

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
    public ResponseEntity<List<String>> getImagesByBoardId(@PathVariable Long dcsBoardId) {
        // dcsBoardId에 해당하는 이미지 리스트 조회
        List<ImageEntity> images = iService.getImagesByBoardId(dcsBoardId);

        // 각 이미지의 URL을 변환하여 반환
        List<String> imageUrls = images.stream()
            .map(image -> iService.convertToPublicUrl(image.getImageUrl())) // 이미지 URL 변환
            .collect(Collectors.toList());

        return ResponseEntity.ok(imageUrls);
    }
}
