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

    public String convertToPublicUrl(String gsPath) {
        // 예: gs://dcsdb-1df4b.firebasestorage.app/sponsor08.png
        if (gsPath.startsWith("gs://")) {
            String bucketName = "dcsdb-1df4b.firebasestorage.app"; // Firebase Storage 버킷 이름
            String filePath = gsPath.substring(gsPath.indexOf('/', 5) + 1); // gs:// 이후 경로 추출
            String encodedPath = filePath.replace("/", "%2F"); // URL-인코딩
            return String.format("https://firebasestorage.googleapis.com/v0/b/%s/o/%s?alt=media",
                    bucketName,
                    encodedPath);
        }
        return gsPath; // 이미 HTTP(S) URL이면 그대로 반환
    }
}
