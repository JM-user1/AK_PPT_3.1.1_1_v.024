package com.jm.spring.springboot.controllers;

import com.jm.spring.springboot.entity.User;
import com.jm.spring.springboot.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class RegistrationController {

    @Autowired
    private UserServiceImpl userServiceImpl;

    @GetMapping("/")
    public String startPage(){
        return "/index";
    }

//    @GetMapping("/registration")
//    public String registration(Model model) {
//        model.addAttribute("userForm", new User());
//        model.addAttribute("allRoles", userServiceImpl.allRoles());
//        return "registration";
//    }

//    @PostMapping()
//    public String addUser(@ModelAttribute("userForm") User userForm, BindingResult bindingResult, Model model) {
//
//        if (bindingResult.hasErrors()) {
//            return "registration";
//        }
//        if (!userServiceImpl.saveUser(userForm)){
//            model.addAttribute("usernameError", "Пользователь с таким именем уже существует");
//            return "registration";
//        }
//
//        userServiceImpl.saveUser(userForm);
//
//        return "redirect:/";
//    }

}
