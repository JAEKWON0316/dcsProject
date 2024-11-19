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

        public static FileDto toFileDto(FileEntity fEntity){
        FileDto fDto = new FileDto();

        fDto.setId(fEntity.getId());
        fDto.setDcsBoardId(fEntity.getDcsBoardId());
        fDto.setFilePath(fEntity.getFilePath());
        fDto.setFileName(fEntity.getFileName());
        fDto.setFileSize(fEntity.getFileSize());
        fDto.setCount(fEntity.getCount());
        fDto.setUploadDate(fEntity.getUploadDate());
        
        return fDto;
    }


      public FileDto(Long id, Long dcsBoardId, String filePath, String fileName, String fileSize, int count, LocalDateTime uploadDate) {
        this.id = id;
        this.dcsBoardId = dcsBoardId;
        this.filePath = filePath;
        this.fileName = fileName;
        this.fileSize = fileSize;
        this.count = count;
        this.uploadDate = uploadDate; 
      
    }
}
