package com.dcs.dcs_project.entity;

import com.dcs.dcs_project.dto.FileDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Setter
@Getter
@Table(name = "dcs_file")
public class FileEntity extends FileTimeEntity{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dcs_board_id")
    private Long dcsBoardId;

    @Column(name = "file_path")
    private String filePath;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "file_size")
    private String fileSize;

    @Column(name = "count")
    private int count;


    public static FileEntity toFileEntity(FileDto fDto){
        
        FileEntity fEntity = new FileEntity();

        fEntity.setId(fDto.getId());
        fEntity.setDcsBoardId(fDto.getDcsBoardId());
        fEntity.setFilePath(fDto.getFilePath());
        fEntity.setFileName(fDto.getFileName());
        fEntity.setFileSize(fDto.getFileSize());
        fEntity.setCount(0);
      
        return fEntity;

    }
}
