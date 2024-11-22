package com.dcs.dcs_project.controller;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dcs.dcs_project.dto.BoardDto;
import com.dcs.dcs_project.service.BoardService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    
    private final BoardService bService;


    @GetMapping("/role/{role}")
    public ResponseEntity<List<BoardDto>> getBoardsByRole(@PathVariable("role") int role) {
        System.out.println("Role received: " + role);  // 역할 값이 제대로 들어오는지 확인
        List<BoardDto> boards = bService.findByRole(role); // 역할에 맞는 게시글 리스트 가져오기
        return ResponseEntity.ok(boards); // JSON 형태로 반환
    }

    //btn 네비게이션
    @GetMapping("/{role}/{id}/btn")
    public ResponseEntity<Map<String, Optional<BoardDto>>> getPrevAndNextBoard(
    @PathVariable int role,
    @PathVariable Long id) {

        Optional<BoardDto> prevBoard = bService.findPrevBoardByRoleAndId(role, id);
        Optional<BoardDto> nextBoard = bService.findNextBoardByRoleAndId(role, id);

        Map<String, Optional<BoardDto>> result = new HashMap<>();
        result.put("prev", prevBoard);
        result.put("next", nextBoard);

        return ResponseEntity.ok(result);
    }


    // /board/paging?page=1
       @GetMapping("/paging")
    public ResponseEntity<Map<String, Object>> paging(@RequestParam(defaultValue = "0") int page) {
        Pageable pageable = PageRequest.of(page, 10); // 페이지 번호와 페이지당 항목 수 지정
        Map<String, Object> response = bService.paging(pageable); // 서비스에서 페이징 데이터 가져오기
        return ResponseEntity.ok(response); // JSON 형태로 응답
    }
    
    @GetMapping("/role/{role}/{id}")
    public ResponseEntity<BoardDto> getBoardByRoleAndId(@PathVariable("role") int role, @PathVariable("id") Long id) {
        BoardDto boardDto = bService.findByRoleAndId(role, id); // role과 id에 맞는 게시글 조회
        return ResponseEntity.ok(boardDto); // JSON 형태로 반환
    }
    

    //조회수 증가
    @PostMapping("/{id}/increment-hit")
    public ResponseEntity<Void> incrementHit(@PathVariable Long id) {
        bService.updateHits(id);
        return ResponseEntity.ok().build();
    }   

    //검색로직추가
    @GetMapping("/role/{role}/search")
    public ResponseEntity<List<BoardDto>> searchBoards(
            @PathVariable("role") int role,
            @RequestParam String searchType,
            @RequestParam String searchValue) {
        List<BoardDto> searchResults = bService.searchBoards(role, searchType, searchValue);

          // 게시글을 최신순으로 정렬 (예시: bbsCreatedTime 기준 내림차순)
        searchResults.sort(Comparator.comparing(BoardDto::getBbsCreatedTime).reversed());
        return ResponseEntity.ok(searchResults);
    }

}