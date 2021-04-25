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


//    @GetMapping("/registration")
//    public String registration(Model model) {
//        model.addAttribute("userForm", new User());
//        model.addAttribute("allRoles", userServiceImpl.allRoles());
//        return "registration";
//    }

    @PostMapping()
    public String addUser(@ModelAttribute("userForm") User userForm, BindingResult bindingResult, Model model) {

        if (bindingResult.hasErrors()) {
            return "admin";
        }
        if (!userServiceImpl.saveUser(userForm)){
            model.addAttribute("usernameError", "Пользователь с таким именем уже существует");
            return "admin";
        }
        userForm.setUsername(userForm.getEmail());
        userServiceImpl.saveUser(userForm);

        return "redirect:/index";
    }



    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") Long id){
        userServiceImpl.deleteUser(id);
        return "redirect:/index";
    }

    @GetMapping("/findUserById")
    @ResponseBody
    public User findUserById(Long id){

        return userServiceImpl.findUserById(id);
    }

//    @PostMapping("/editUser")
//    public String editUser(User user){
//        System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++");
//        System.out.println("user.getUsername(): "+user.getRoles());
//        System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++");
//
//        userServiceImpl.updateUser(user);
//        return "redirect:/index";
//    }

    @GetMapping("/edit/{id}")
    public String editUser( ModelMap modelMap, @PathVariable("id") Long id){
        modelMap.addAttribute("user",userServiceImpl.getById(id));
        return "/index";
    }

//    @PatchMapping("/edit/{id}")
//    public String editUser(@ModelAttribute("user") User user, @PathVariable("id")Long id){
//        userServiceImpl.editUser(id, user);
//        return "redirect:/index";
//    }

}
