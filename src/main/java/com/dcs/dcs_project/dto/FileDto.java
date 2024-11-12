package com.dcs.dcs_project.dto;

import java.time.LocalDateTime;

import com.dcs.dcs_project.entity.FileEntity;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString 
@NoArgsConstructor  //기본생성자 생성
@AllArgsConstructor //필드 모든생성자 생성
public class FileDto {
    private long id;
    private long dcsBoardId;
    private String filePath;
    private String fileName;
    private String fileSize;
    private int count;

     @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDateTime uploadDate;

      public FileDto(FileEntity fEntity) {
        this.id = fEntity.getId();
        this.dcsBoardId = fEntity.getDcsBoardId();
        this.filePath = fEntity.getFilePath();
        this.fileName = fEntity.getFileName();
        this.fileSize = fEntity.getFileSize();
        this.count = fEntity.getCount();
        this.uploadDate = fEntity.getUploadDate();
      
    }
}
