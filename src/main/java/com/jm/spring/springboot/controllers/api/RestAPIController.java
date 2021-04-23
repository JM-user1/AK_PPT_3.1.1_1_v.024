package com.jm.spring.springboot.controllers.api;

import com.jm.spring.springboot.entity.User;
import com.jm.spring.springboot.repository.UserRepository;
import com.jm.spring.springboot.service.UserServiceImpl;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class RestAPIController {
    private final UserServiceImpl userServiceImpl;
    private final UserRepository userRepository;

    public RestAPIController(UserServiceImpl userServiceImpl, UserRepository userRepository) {
        this.userServiceImpl = userServiceImpl;
        this.userRepository = userRepository;
    }


    @GetMapping("/users")
    public List<User> userList(){
        return userServiceImpl.allUsers();
    }

    @GetMapping("/users/{id}")
    public User user(@PathVariable Long id){
        return userServiceImpl.findUserById(id);
    }

    @PostMapping("users")
    public User addNewUser(@RequestBody User user){
         userServiceImpl.saveUser(user);
         return user;
    }

    @PutMapping ("/api/users")
    public @ResponseBody String updateUser(@RequestBody User user){
        userServiceImpl.saveUser(user);
        return "/index";
    }

    @DeleteMapping("/users/{id}")
    public String  deleteUser(@PathVariable Long id){
        userServiceImpl.deleteUser(id);
        return "/index";
    }

}