package com.dcs.dcs_project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dcs.dcs_project.entity.FileEntity;
import com.dcs.dcs_project.service.FileService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private FileService fileService;

      // 다운로드 횟수 증가 처리
      @CrossOrigin(origins = "http://www.daecheongse.com")  // 특정 Origin만 허용
      @PostMapping("/board/{fileId}")
        public ResponseEntity<?> incrementCount(@PathVariable Long fileId) {
            FileEntity updatedFile = fileService.incrementCount(fileId);  // 카운트 증가 서비스 호출
            return ResponseEntity.ok(updatedFile);  // 업데이트된 파일 반환
        }
    
        @GetMapping("/board/{dcsBoardId}")
        public ResponseEntity<List<FileEntity>> getFilesByBoardId(@PathVariable Long dcsBoardId) {
            // dcsBoardId로 파일 조회
            List<FileEntity> files = fileService.getFilesByBoardId(dcsBoardId);
        
            // 각 파일의 URL을 Firebase Public URL로 변환
            files.forEach(file -> file.setFilePath(fileService.convertToPublicfUrl(file.getFilePath())));
        
            return ResponseEntity.ok(files);
        }

      // 파일 존재 여부 확인
      @GetMapping("/board/{dcsBoardId}/hasFile")
      public ResponseEntity<Boolean> checkIfFileExists(@PathVariable Long dcsBoardId) {
        boolean fileExists = fileService.doesFileExistForBoard(dcsBoardId);
        return ResponseEntity.ok(fileExists);
    }

}
