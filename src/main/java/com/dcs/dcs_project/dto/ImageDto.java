package com.dcs.dcs_project.dto;

import com.dcs.dcs_project.entity.ImageEntity;

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
public class ImageDto {
    private long id;
    private long dcsBoardId;
    private String imageUrl;


       // ImageEntity를 기반으로 ImageDto 생성
    public ImageDto(ImageEntity entity) {
        this.id = entity.getId();
        this.dcsBoardId = entity.getDcsBoardId();
        this.imageUrl = entity.getImageUrl();
    }
}
