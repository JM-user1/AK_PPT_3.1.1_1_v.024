package com.jm.spring.springboot.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserController {
    @GetMapping("/news")
    public String userNews(){
        return "news";
    }
}
