package com.dcs.dcs_project.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dcs.dcs_project.entity.FileEntity;
import com.dcs.dcs_project.repository.FileRepository;

import lombok.RequiredArgsConstructor;

import com.dcs.dcs_project.exception.*;

@Service
@RequiredArgsConstructor 
public class FileService {

      @Autowired 
      private FileRepository fileRepository;

      // 파일 ID로 파일 엔티티 조회
    public FileEntity getFileById(Long fileId) {
        return fileRepository.findById(fileId).orElseThrow(() -> new RuntimeException("파일을 찾을 수 없습니다."));
    }

       // 다운로드 카운트 증가
       @Transactional
       public FileEntity incrementCount(Long fileId) {
            // 파일을 Optional로 찾기
    Optional<FileEntity> optionalFile = fileRepository.findById(fileId);

    // 파일이 없으면 ResourceNotFoundException 예외 던지기
    FileEntity file = optionalFile.orElseThrow(() -> new ResourceNotFoundException("File not found with id " + fileId));

    // 카운트 증가
    file.setCount(file.getCount() + 1);

    // 카운트 증가 후 파일 저장
    return fileRepository.save(file);
       }

      public List<FileEntity> getFilesByBoardId(Long dcsBoardId) {
        return fileRepository.findByDcsBoardId(dcsBoardId);

    }
}