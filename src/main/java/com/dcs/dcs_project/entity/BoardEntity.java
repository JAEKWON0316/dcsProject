package com.dcs.dcs_project.entity;

import com.dcs.dcs_project.dto.BoardDto;

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
@Table(name="dcs_board")
public class BoardEntity extends TimesEntity {    //spring-boot에서는 entity가 mysql의 db와 같다!!
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length=20, nullable = false)
    private String writer;
    
    @Column(length=45, nullable = false)
    private String imnum;

    @Column(length=255, nullable = false)
    private String title;

    @Column(length=1000, nullable = false)
    private String content;

    @Column
    private int hit;
    
    @Column
    private int role;

    public static BoardEntity toBoardEntity(BoardDto bDto){
        
        BoardEntity bEntity = new BoardEntity();

        bEntity.setWriter(bDto.getWriter());
        bEntity.setImnum(bDto.getImnum());
        bEntity.setTitle(bDto.getTitle());
        bEntity.setContent(bDto.getContent());
        bEntity.setHit(0);
        bEntity.setRole(bDto.getRole());

        //날짜는 db에서 저절로 생성되기 때문에 안해줘도 된다.

        
        return bEntity;
    }

    public static BoardEntity toUpdateEntity(BoardDto bDto){
    
        BoardEntity bEntity = new BoardEntity();

        bEntity.setId(bDto.getId());
        bEntity.setWriter(bDto.getWriter());
        bEntity.setImnum(bDto.getImnum());
        bEntity.setTitle(bDto.getTitle());
        bEntity.setContent(bDto.getContent());
        bEntity.setHit(bDto.getHit());
        bEntity.setRole(bDto.getRole());

        return bEntity;
    }
}