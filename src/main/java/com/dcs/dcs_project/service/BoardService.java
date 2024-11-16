package com.dcs.dcs_project.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

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

 
    public List<BoardDto> findByRole(int role) {
           // 내림차순으로 정렬된 데이터 가져오기 (가장 최신 항목이 위로 오도록)
    List<BoardEntity> boards = boardRepository.findByRole(role, Sort.by(Sort.Direction.DESC, "id"));
    return boards.stream()
                 .map(BoardDto::toBoardDto)
                 .collect(Collectors.toList());
    }
    //role,id값으로 content 뽑기
    public BoardDto findByRoleAndId(int role, Long id) {
        BoardEntity boardEntity = boardRepository.findByRoleAndId(role, id)
            .orElseThrow(() -> new RuntimeException("게시글이 존재하지 않습니다."));
        return BoardDto.toBoardDto(boardEntity);
    }
     
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

    /*검색기능 추가 */
    public List<BoardDto> searchBoards(int role, String searchType, String searchValue) {
        List<BoardEntity> searchResults;

        switch (searchType) {
            case "writer":
                searchResults = boardRepository.findByRoleAndWriterContaining(role, searchValue);
                break;
            case "title":
                searchResults = boardRepository.findByRoleAndTitleContaining(role, searchValue);
                break;
            case "content":
                searchResults = boardRepository.findByRoleAndContentContaining(role, searchValue);
                break;
            default:
                throw new IllegalArgumentException("Invalid search type: " + searchType);
        }

        // BoardEntity를 BoardDto로 변환
        return searchResults.stream()
                .map(BoardDto::toBoardDto) // 여기서 기존의 toBoardDto 메서드를 사용
                .collect(Collectors.toList());
    }

      /* btn 네비게이션 */
      public Optional<BoardDto> findPrevBoardByRoleAndId(int role, Long id) {
        return boardRepository.findFirstByRoleAndIdLessThanOrderByIdDesc(role, id)
                .map(this::convertToDto);  // BoardEntity를 BoardDto로 변환
    }

    public Optional<BoardDto> findNextBoardByRoleAndId(int role, Long id) {
        return boardRepository.findFirstByRoleAndIdGreaterThanOrderByIdAsc(role, id)
                .map(this::convertToDto);  // BoardEntity를 BoardDto로 변환
    }

    private BoardDto convertToDto(BoardEntity bentity) {
        return new BoardDto(bentity.getId(), bentity.getWriter(), bentity.getTitle(),
                            bentity.getContent(), bentity.getHit(), bentity.getRole(),
                            bentity.getCreatedTime(), bentity.getUpdatedTime());
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

    public Map<String, Object> paging(Pageable pageable) {
        int page = pageable.getPageNumber();
        int pageLimit = 10; // 한 페이지에 보여줄 글의 갯수.
    
        Page<BoardEntity> bEntities = boardRepository.findAll(PageRequest.of(page, pageLimit, Sort.by(Sort.Direction.DESC, "id")));
        
        // 페이징 정보 및 게시글 리스트 구성
        Map<String, Object> response = new HashMap<>();
        response.put("boardList", bEntities.getContent()); // 게시글 내용
        response.put("totalPages", bEntities.getTotalPages()); // 전체 페이지 수
        response.put("totalElements", bEntities.getTotalElements()); // 전체 글 수
        response.put("currentPage", bEntities.getNumber()); // 현재 페이지
        response.put("pageSize", bEntities.getSize()); // 페이지당 글 수
        response.put("hasNext", bEntities.hasNext()); // 다음 페이지 여부
        response.put("hasPrevious", bEntities.hasPrevious()); // 이전 페이지 여부
        response.put("isFirst", bEntities.isFirst()); // 첫 페이지 여부
        response.put("isLast", bEntities.isLast()); // 마지막 페이지 여부
        
        return response; // JSON 형태로 반환
    }
}