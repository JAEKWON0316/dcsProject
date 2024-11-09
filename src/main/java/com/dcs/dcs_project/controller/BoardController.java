package com.dcs.dcs_project.controller;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.dcs.dcs_project.dto.BoardDto;
import com.dcs.dcs_project.service.BoardService;

import lombok.RequiredArgsConstructor;

import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board")
public class BoardController {
    
    private final BoardService bService;

    @GetMapping("/")
    public List<BoardDto> getList() {
        System.out.println("list");
        List<BoardDto> bDtoList = bService.findAll();
        return bDtoList; // JSON 형식으로 반환
    }

    // /board/paging?page=1
    @GetMapping("/paging")
        public String paging(@PageableDefault(page = 1) Pageable pageable, Model model){
            Page<BoardDto> boardList = bService.paging(pageable);
            int blockLimit = 10; //한 페이지에 보여질 페이징 수
            //1, 4, 7, 10, ...
            int startPage = (((int) (Math.ceil((double)pageable.getPageNumber() / blockLimit))) - 1) * blockLimit + 1;
            int endPage = ((startPage + blockLimit - 1) < boardList.getTotalPages())? startPage + blockLimit - 1 : boardList.getTotalPages();
            model.addAttribute("boardList", boardList); //model에 담아서 페이지를 넘겨준다(boradList에 boardList를 담아서 보내준다.)
            model.addAttribute("startPage", startPage);
            model.addAttribute("endPage", endPage);
            return "paging";
        }
    

    @GetMapping("/{id}")
    public String detailView(@PathVariable("id") Long id, Model model) {
        /**
         * 로직 
         * 1.조회수(hit)를 1 올리고 
         * 2.detial.html 을 출력
         */
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
    
    /*
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