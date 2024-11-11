package com.dcs.dcs_project.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.dcs.dcs_project.entity.ImageEntity;
import com.dcs.dcs_project.repository.ImageRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class ImageService {
    private final ImageRepository imageRepository;

    public List<ImageEntity> getImagesByBoardId(Long dcsBoardId) {
        return imageRepository.findByDcsBoardId(dcsBoardId);  // dcsBoardId에 해당하는 이미지를 조회
    }
}
