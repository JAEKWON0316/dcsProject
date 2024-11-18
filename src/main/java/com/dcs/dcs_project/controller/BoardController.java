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

   /* 
    @GetMapping("/{id}")
    public String detailView(@PathVariable("id") Long id, Model model) {
       
        bService.updateHits(id);
        BoardDto bDto = bService.findById(id);
        model.addAttribute("board", bDto); 
        return "detail";
    }
   
    @GetMapping("/write")
    public String getWrite() {
        System.out.println("write");
        return "write";
    }
    
    @PostMapping("/write")
    public String setWrite(@ModelAttribute BoardDto bDto) { // setWrite에 글씨를 쓰면 dto에 들어간다.

        System.out.println("boardDto = " + bDto);
        bService.write(bDto);
        return "redirect:/board/";  //redirect를 하는 이유: 글쓰기 완료된 이후에 주소창도 넘어가기 위함.
    }

    @GetMapping("/update/{id}")
    public String updateForm(@PathVariable("id") Long id, Model model){
        BoardDto boardDto = bService.findById(id);
        model.addAttribute("board", boardDto);
        return "update";
    }
    
    
    @PostMapping("/update")
    public String update(@ModelAttribute BoardDto bDto, Model model, RedirectAttributes redirectAttributes){  //getter에서 쓴 내용이 model에서 담겨져 온다 , redirectAttribute는 ruturn을 redirect로 할 때 쓴다!
        //비밀번호 검증을 위해 bDto에서 받을 비번과 boardDto에 담겨있는 비번을 비교한다.
        BoardDto boardDto = bService.findById(bDto.getId());
        if(boardDto.getPass().equals(bDto.getPass())){
            //수정로직 처리
            BoardDto board = bService.update(bDto);
            model.addAttribute("board", board);

            return "detail";
        }
        else{
            redirectAttributes.addFlashAttribute("error", "비밀번호가 일치하지 않습니다.");  //update에서 error라는 네임으로 안의 벨류를 쓸 수 있다.
            return "redirect:/board/update/" + bDto.getId();
        }
        
    }

    @GetMapping("/delete/{id}")
    public String deleteForm(@PathVariable("id") Long id, Model model){ //파라미터창으로 들어오는 id값과 model을 받는다
       
        
        model.addAttribute("id", id);

        return "deleteForm";
    } */
     
    /*
    @PostMapping("/delete")
    public String delete(@RequestParam("id") Long id, @RequestParam("pass") String pass, Model model, RedirectAttributes redirectAttributes){

        //1 pass에 값이 있는지?
        if(pass == null || pass.isEmpty()){
            redirectAttributes.addFlashAttribute("error", "비밀번호가 일치하지 않습니다."); //이거는 에러출력로직
            return "redirect:delete/" + id;
        }

        //2. id와 pass가 db와 같은지?
        BoardDto boardDto = bService.findById(id); //boardDto에 id값을 넣어준다.
        if(boardDto != null && boardDto.getPass().equals(pass)){
            //성공로직(게시물삭제)
            bService.delete(id);
            return "redirect:/board/";
        }
        else{
            redirectAttributes.addFlashAttribute("error", "비밀번호가 틀렸습니다.."); 
            return "redirect:delete/" + id;
        }
    }
     */
}