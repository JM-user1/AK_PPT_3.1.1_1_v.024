package com.jm.spring.springboot.controllers;

import com.jm.spring.springboot.entity.User;
import com.jm.spring.springboot.repository.UserRepository;
import com.jm.spring.springboot.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@Controller
public class AdminController {
    private final UserServiceImpl userServiceImpl;
    private final UserRepository userRepository;
    @Autowired
    public AdminController(UserServiceImpl userServiceImpl, UserRepository userRepository) {
        this.userServiceImpl = userServiceImpl;
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String index(){
        return "index";
    }


    @GetMapping("/index")
    public String userList(Model model, Principal principal){
        model.addAttribute("thisUser", userServiceImpl.findUserByName(principal.getName()));
        model.addAttribute("allUsers", userServiceImpl.allUsers());

        model.addAttribute("userForm", new User());
        model.addAttribute("allRoles", userServiceImpl.allRoles());

        return "index";
    }



//    @PostMapping()
//    public String addUser(@ModelAttribute("userForm") User userForm, BindingResult bindingResult, Model model) {
//
//        if (bindingResult.hasErrors()) {
//            return "admin";
//        }
//        if (!userServiceImpl.saveUser(userForm)){
//            model.addAttribute("usernameError", "Пользователь с таким именем уже существует");
//            return "admin";
//        }
//        userForm.setUsername(userForm.getEmail());
//        userServiceImpl.saveUser(userForm);
//
//        return "redirect:/index";
//    }


}
