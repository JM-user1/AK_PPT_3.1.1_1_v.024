package com.jm.spring.springboot.controllers;

import com.jm.spring.springboot.entity.User;
import com.jm.spring.springboot.repository.RoleRepository;
import com.jm.spring.springboot.repository.UserRepository;
import com.jm.spring.springboot.service.UserService;
import com.jm.spring.springboot.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;


@Controller
public class AdminController {
    private final UserService userServiceImpl;
    private final RoleRepository roleRepository;

    @Autowired
    public AdminController(UserServiceImpl userServiceImpl, RoleRepository roleRepository) {
        this.userServiceImpl = userServiceImpl;
        this.roleRepository = roleRepository;
    }

    @GetMapping("/")
    public String index() {
        return "index";
    }


    @GetMapping("/index")
    public String userList(Model model, Principal principal) {
        model.addAttribute("thisUser", userServiceImpl.findUserByName(principal.getName()));
        model.addAttribute("allUsers", userServiceImpl.allUsers());

        model.addAttribute("userForm", new User());
        model.addAttribute("allRoles", roleRepository.findAll());

        return "index";
    }

}
