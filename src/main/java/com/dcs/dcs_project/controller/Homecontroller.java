package com.dcs.dcs_project.controller;

import org.springframework.web.bind.annotation.GetMapping;

public class Homecontroller {
      @GetMapping("/")  
    public String index() {
        System.out.println("index파일 시작");
        return "index";
 }
}