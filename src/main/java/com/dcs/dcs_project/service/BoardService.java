package com.dcs.dcs_project.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dcs.dcs_project.dto.BoardDto;
import com.dcs.dcs_project.entity.BoardEntity;
import com.dcs.dcs_project.repository.BoardRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor 
public class BoardService {
    private final BoardRepository boardRepository; //다시 수정할 수 없도록 final로 가지고 온다.
    
    public void write(BoardDto bDto){
        BoardEntity bEntity = BoardEntity.toBoardEntity(bDto);  //dto를 받아서 entity안에 넣어준다.
        boardRepository.save(bEntity);  //레포지토리에서 save 되면서 쿼리문이 만들어진다. save는 레포지토리 내장메소드
    }
    
    public List<BoardDto> findAll(){
        //column에 있는 모든 내용을 가져옴
        List<BoardEntity> bEntities = boardRepository.findAll(Sort.by(Sort.Direction.DESC, "id")); //id컬럼을 기준으로 내림차순 정렬 하는 sort

        //BoardDto 타입의 ArrayList를 만듦
        List<BoardDto> bDtos = new ArrayList<>();

        //위에서 만든 ArrayList 박스에 column에서 가져온 내용을 채움
        for(BoardEntity bEntity : bEntities){
            bDtos.add(BoardDto.toBoardDto(bEntity));
        }
        return bDtos;
    }

    /*게시글 조회수 증가 */
    @Transactional
    public void updateHits(Long id) {
        boardRepository.updateHits(id);
    }


    /* 게시물 보기 */
    public BoardDto findById(Long id){
        // Optional 값이 있을 수도 있고 없을 수도 있는 타입.
        Optional<BoardEntity> optionalBoardEntity = boardRepository.findById(id);
        if(optionalBoardEntity.isPresent()){    //isPresent로 안에 내용을 boolean 타입으로 반환해준다.     
            
            BoardEntity boardEntity = optionalBoardEntity.get();   //값이 있으면 entity(컬럼)에 값을 담아
            BoardDto boardDto = BoardDto.toBoardDto(boardEntity); //그다음 dto를 뽑는다.
            return boardDto;  
        }
        else{
            return null;
        }
    }

    /* 게시물 수정 */
    public BoardDto update(BoardDto bDto){
        /* 
        Optional<BoardEntity> exEntity = boardRepository.findById(bDto.getId());
        if(exEntity.isPresent()){
            BoardEntity bEntity = exEntity.get();
            bEntity.setTitle(bDto.getTitle());
            bEntity.setContents(bDto.getContents());
        }
        */
        BoardEntity boardEntity = BoardEntity.toUpdateEntity(bDto);
        boardRepository.save(boardEntity);
        return findById(bDto.getId());
    }

    /* 게시물 삭제 */
    public void delete(Long id){
        boardRepository.deleteById(id);
    }

    public Page<BoardDto> paging(Pageable pageable){
        int page = pageable.getPageNumber() -1; //limit 값 0 이클립스에서 넘겨준 cpg가 getPageNumber()와 같다.
        int pageLimit = 12; //한 페이지에 보여줄 글의 갯수.
        //select * from bboard limit 0 , 5;

        Page<BoardEntity> bEntities = boardRepository.findAll(PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));
        /**
         * 1.전체 글 수
         * 2. db에 요청한 페이지 번호
         * 3. 요청 페이지의 해당 글
         * 4. 전체 페이지 수
         * 5. 한 페이지에 보여지는 글 수
         * 6. 이전 페이지 (true, false)
         * 7. 첫 페이지 (true, false)
         * 8. 마지막 페이지 (true, false)
         */
        System.out.println("1. 전체 글 수 :" + bEntities.getTotalElements());
        System.out.println("2. db에 요청한 페이지 번호 : " + bEntities.getNumber());
        System.out.println("3. 요청 페이지의 해당 글 : " + bEntities.getContent());
        System.out.println("4. 전체 페이지 수  : " +bEntities.getTotalPages());
        System.out.println("5. 한 페이지에 보여지는 글 수 :" +bEntities.getSize());
        System.out.println("6. 이전 페이지 : " +bEntities.hasPrevious());
        System.out.println("7. 다음 페이지 : " +bEntities.hasNext());
        System.out.println("8. 첫 페이지 : " + bEntities.isFirst());
        System.out.println("9. 마지막 페이지 : " + bEntities.isLast());

        //목록에서 보여줄 내용 id, bwriter, hits, title, createdTime
        Page<BoardDto> boardDtos = bEntities.map( board -> new BoardDto(board.getId(), board.getWriter(), board.getHit(), board.getTitle(), board.getCreatedTime()));
        return boardDtos;
    }
}