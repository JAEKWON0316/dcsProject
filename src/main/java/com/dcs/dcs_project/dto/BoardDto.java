package com.dcs.dcs_project.dto;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.dcs.dcs_project.entity.BoardEntity;

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
public class BoardDto {
    private long id;
    private String writer;
    private String title;
    private String content;
    private int hit;
    private int role;
    

    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDateTime bbsCreatedTime; //insert

    @JsonFormat(pattern = "yyyy.MM.dd")
    private LocalDateTime bbsUpdatedTime; //update


    public static BoardDto toBoardDto(BoardEntity bEntity){
        BoardDto bDto = new BoardDto();

        bDto.setId(bEntity.getId());
        bDto.setWriter(bEntity.getWriter());
        bDto.setTitle(bEntity.getTitle());
        bDto.setContent(bEntity.getContent());
        bDto.setHit(bEntity.getHit());
        bDto.setRole(bEntity.getRole());
        bDto.setBbsCreatedTime(bEntity.getCreatedTime());
        bDto.setBbsUpdatedTime(bEntity.getUpdatedTime());

        return bDto;
    }
    public BoardDto(Long id, String writer,String title,  String content, int hit, int role, LocalDateTime bbsCreatedTime){
        this.id = id;
        this.writer = writer;
        this.title = title;
        this.content = content;
        this.hit = hit;
        this.role = role;
        this.bbsCreatedTime = bbsCreatedTime;
             
    }   
}